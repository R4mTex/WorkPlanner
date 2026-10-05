import * as argon2 from 'argon2';
import { Request, Response } from 'express';
import Redis from 'ioredis';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

import { convertToMs, parseFromRedis, serializeForRedis } from 'src/function';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    private redisClient: Redis;
    constructor(
        private readonly prisma: PrismaService,
        private userService: UserService,
        private jwtService: JwtService,
    ) {
        this.redisClient = new Redis('redis://localhost:6379');
    }

    async signIn(
        email: string,
        pass: string,
        response: Response,
    ): Promise<{
        user: Omit<User, 'password' | 'hashedRefreshToken'>;
    }> {
        const user = await this.userService.findByEmail(email);
        console.log('auth.service - user : ', user);

        if (!user) {
            throw new UnauthorizedException(
                `User with email ${email} not found`,
            );
        }

        /* const generateHash = await argon2.hash('test');
        console.log(generateHash); */

        const isPasswordValid = await argon2.verify(user.password, pass);
        console.log('auth.service - isPasswordValid : ', isPasswordValid);

        if (!isPasswordValid) {
            throw new UnauthorizedException(
                'Invalid credentials: incorrect password.',
            );
        }

        const payload = {
            sub: user.id,
            email: user.email,
        };

        const accessExpire = process.env.JWT_ACCESS_EXPIRE;
        const refreshExpire = process.env.JWT_REFRESH_EXPIRE;

        if (!accessExpire || !refreshExpire) {
            throw new Error('JWT access/refresh expire times not set in .env');
        }

        const accessToken = await this.jwtService.signAsync(payload);
        const refreshToken = await this.jwtService.signAsync(payload, {
            secret: process.env.JWT_REFRESH_SECRET_KEY,
            expiresIn: refreshExpire,
        });
        console.log('auth.service - accessToken : ', accessToken);
        console.log('auth.service - refreshToken : ', refreshToken);

        const hashedRefreshToken = await argon2.hash(refreshToken);
        await this.userService.updateRefreshToken(user.id, hashedRefreshToken);

        response.cookie('access_token', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: convertToMs(accessExpire),
        });

        response.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: convertToMs(refreshExpire),
        });

        const {
            password,
            hashedRefreshToken: _,
            ...userWithoutSensitiveFields
        } = user;

        const userFields = serializeForRedis({
            ...userWithoutSensitiveFields,
            refresh_token: hashedRefreshToken,
        });

        await this.redisClient.hset(`user-${payload.sub}`, ...userFields);

        return {
            user: userWithoutSensitiveFields,
        };
    }

    async refreshAccessToken(
        refreshToken: string,
    ): Promise<{ accessToken: string; refreshToken: string }> {
        try {
            console.log('[Auth] Step 1: Start refresh process.');

            const payload = await this.jwtService.verifyAsync(refreshToken, {
                secret: process.env.JWT_REFRESH_SECRET_KEY,
            });

            console.log('[Auth] Step 2: Token verified.');

            const cachedUser = await this.redisClient.hgetall(
                `user-${payload.sub}`,
            );
            console.log('[Auth] Step 3: User cache retrieved.');

            if (!cachedUser || !cachedUser.refresh_token) {
                console.log('[Auth] Step 4: Token missing or malformed.');
                throw new UnauthorizedException('Unable to refresh token.');
            }

            console.log('[Auth] Step 5: Verifying token integrity...');
            const isRefreshTokenValid = await argon2.verify(
                cachedUser.refresh_token,
                refreshToken,
            );

            if (!isRefreshTokenValid) {
                console.log('[Auth] Step 6: Token integrity failed.');
                throw new UnauthorizedException('Unable to refresh token.');
            }

            console.log('[Auth] Step 7: Generating new tokens...');
            const { exp, iat, nbf, ...cleanPayload } = payload;

            const newAccessToken = await this.jwtService.signAsync({
                sub: payload.sub,
                email: payload.email,
            });

            const newRefreshToken = await this.jwtService.signAsync(
                cleanPayload,
                {
                    secret: process.env.JWT_REFRESH_SECRET_KEY,
                    expiresIn: process.env.JWT_REFRESH_EXPIRE,
                },
            );

            const newHashedRefreshToken = await argon2.hash(newRefreshToken);

            console.log('[Auth] Step 8: Updating store...');
            await this.userService.updateRefreshToken(
                payload.sub,
                newHashedRefreshToken,
            );
            await this.redisClient.hset(
                `user-${payload.sub}`,
                'refresh_token',
                newHashedRefreshToken,
            );

            console.log('[Auth] Step 9: Refresh completed.');
            return {
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
            };
        } catch (error) {
            console.error('[Auth] Error during refresh.');
            throw new UnauthorizedException('Token refresh failed.');
        }
    }

    async logout(
        response: Response,
        request: Request,
    ): Promise<{ message: string }> {
        try {
            console.log(
                '@Post(logout) Session avant suppression: ',
                request.session,
            );

            const userId = request.session?.userId;
            console.log('userId : ', userId);

            if (!userId) {
                throw new UnauthorizedException(
                    'User ID not found during logout',
                );
            }

            console.log(
                'Headers envoyés avant suppression au client :',
                response.getHeaders(),
            );

            console.log('Start clear Cookies');

            response.clearCookie('access_token', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                path: '/',
            });

            console.log('Clear access_token cookie');

            response.clearCookie('connect.sid', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                path: '/',
            });

            console.log('Clear connect.sid cookie');

            response.clearCookie('refresh_token', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                path: '/',
            });

            console.log('Clear refresh_token cookie');

            console.log(
                'Headers envoyés après suppression au client :',
                response.getHeaders(),
            );

            await this.redisClient.del(`user-${userId}`);

            console.log(
                '`user-${userId}` : ',
                await this.redisClient.hgetall(`user-${userId}`),
            );

            await this.prisma.user.update({
                where: { id: userId },
                data: { hashedRefreshToken: null },
            });

            console.log('hashedRefreshToken supprimé');

            await new Promise((resolve, reject) => {
                request.session.destroy((error) => {
                    if (error) {
                        console.error(
                            'Erreur lors de la suppression de la session :',
                            error,
                        );
                        reject(
                            new UnauthorizedException(
                                'Erreur lors de la suppression de la session',
                            ),
                        );
                    } else {
                        console.log('Session supprimée avec succès.');
                        resolve(null);
                    }
                });
            });

            console.log('Cookies après suppression : ', request.cookies);
            console.log('Session après suppression : ', request.session);

            return { message: 'Suppréssion des caches bien effectué' };
        } catch (error) {
            console.error('[AuthService] Error during logout:', error);
            throw new UnauthorizedException('Error during logout');
        }
    }
}
