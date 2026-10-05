import * as argon2 from 'argon2';
import { Response } from 'express';
import Redis from 'ioredis';

import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Role, User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { hashPassword } from 'prisma/seed/seedUsers';

import { convertToMs, serializeForRedis } from 'src/function';
import { UpdateProfessionalDto } from 'src/professional/dto/update-professional.dto';
import { UpdateUserParamsDto } from 'src/user-params/dto/update-user-params.dto';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
    private redisClient: Redis;
    constructor(
        private readonly prisma: PrismaService,
        private jwtService: JwtService,
    ) {
        this.redisClient = new Redis('redis://localhost:6379');
    }

    async create(
        createUserDto: CreateUserDto,
        response: Response,
    ): Promise<{ user: Omit<User, 'password' | 'hashedRefreshToken'> }> {
        const createdUser = await this.prisma.user.create({
            data: {
                email: createUserDto.email,
                password: await hashPassword(createUserDto.password),
                role: createUserDto.role,
            },
        });

        if (createUserDto.role === Role.Individual) {
            await this.prisma.userParams.create({
                data: {
                    lastname: '',
                    firstname: '',
                    phoneNumber: '',
                    streetNumber: '',
                    streetName: '',
                    postalCode: '',
                    city: '',
                    country: '',
                    userId: createdUser.id,
                },
            });
        } else if (createUserDto.role === Role.Participant) {
            await this.prisma.professional.create({
                data: {
                    phoneNumber: '',
                    name: '',
                    managerName: '',
                    legalStatus: '',
                    workforce: 0,
                    streetNumber: '',
                    streetName: '',
                    postalCode: '',
                    city: '',
                    country: '',
                    userId: createdUser.id,
                },
            });
        }

        const payload = {
            sub: createdUser.id,
            email: createdUser.email,
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

        const hashedRefreshToken = await argon2.hash(refreshToken);
        await this.updateRefreshToken(createdUser.id, hashedRefreshToken);

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
            ...userWithoutSensitive
        } = createdUser;

        const userFields = serializeForRedis({
            ...userWithoutSensitive,
            refresh_token: hashedRefreshToken,
        });

        await this.redisClient.hset(`user-${payload.sub}`, ...userFields);

        console.log(
            'user.service - userWithoutSensitive : ',
            userWithoutSensitive,
        );

        return {
            user: userWithoutSensitive,
        };
    }

    async findOne(id: number) {
        const existingUser = await this.prisma.user.findUniqueOrThrow({
            where: { id },
        });

        const relations = {
            userWorksites: {
                include: {
                    worksite: true,
                },
            },
            userNotifications: {
                include: {
                    notification: true,
                },
            },
            userHasTrade: {
                include: {
                    trade: true,
                },
            },
            userTasks: {
                include: {
                    task: true,
                },
            },
        };

        if (existingUser?.role === 'Individual') {
            const existingUserParams = await this.prisma.user.findUnique({
                where: { id },
                include: {
                    userParams: {
                        where: {
                            userId: id,
                        },
                    },
                    ...relations,
                },
            });

            return existingUserParams;
        } else {
            const existingProfessional = await this.prisma.user.findUnique({
                where: { id },
                include: {
                    professional: {
                        where: {
                            userId: id,
                        },
                    },
                    ...relations,
                },
            });

            return existingProfessional;
        }
    }

    async update(
        id: number,
        updateUserDto: Partial<UpdateUserDto>,
        userParams: Partial<UpdateUserParamsDto>,
        professional: Partial<UpdateProfessionalDto>,
        response: Response,
    ): Promise<Omit<User, 'password' | 'hashedRefreshToken'>> {
        const existingUser = await this.prisma.user.findUniqueOrThrow({
            where: { id },
        });

        const updatedUser = await this.prisma.user.update({
            where: { id },
            data: {
                ...(updateUserDto.email && { email: updateUserDto.email }),
                ...(updateUserDto.password && {
                    password: await hashPassword(updateUserDto.password),
                }),
            },
        });

        if (existingUser.role === 'Individual') {
            const userParamsDto = {
                ...(userParams.lastname && { lastname: userParams.lastname }),
                ...(userParams.firstname && {
                    firstname: userParams.firstname,
                }),
                ...(userParams.phoneNumber && {
                    phoneNumber: userParams.phoneNumber,
                }),
                ...(userParams.streetNumber && {
                    streetNumber: userParams.streetNumber,
                }),
                ...(userParams.streetName && {
                    streetName: userParams.streetName,
                }),
                ...(userParams.postalCode && {
                    postalCode: userParams.postalCode,
                }),
                ...(userParams.city && { city: userParams.city }),
                ...(userParams.country && { country: userParams.country }),
            };

            await this.prisma.userParams.update({
                where: { userId: id },
                data: userParamsDto,
            });
        } else if (existingUser.role === 'Participant') {
            const professionalDto = {
                ...(professional.phoneNumber && {
                    phoneNumber: professional.phoneNumber,
                }),
                ...(professional.name && { name: professional.name }),
                ...(professional.managerName && {
                    managerName: professional.managerName,
                }),
                ...(professional.legalStatus && {
                    legalStatus: professional.legalStatus,
                }),
                ...(professional.workforce !== undefined && {
                    workforce: professional.workforce,
                }),
                ...(professional.streetNumber && {
                    streetNumber: professional.streetNumber,
                }),
                ...(professional.streetName && {
                    streetName: professional.streetName,
                }),
                ...(professional.postalCode && {
                    postalCode: professional.postalCode,
                }),
                ...(professional.city && { city: professional.city }),
                ...(professional.country && { country: professional.country }),
            };

            await this.prisma.professional.update({
                where: { userId: id },
                data: professionalDto,
            });
        }

        const payload = {
            sub: updatedUser.id,
            email: updatedUser.email,
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

        const hashedRefreshToken = await argon2.hash(refreshToken);
        await this.updateRefreshToken(updatedUser.id, hashedRefreshToken);

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
            ...userWithoutSensitive
        } = updatedUser;

        const userFields = serializeForRedis({
            ...userWithoutSensitive,
            refresh_token: hashedRefreshToken,
        });

        await this.redisClient.hset(`user-${payload.sub}`, ...userFields);

        return userWithoutSensitive;
    }

    async findByEmail(
        email: string,
    ): Promise<Awaited<ReturnType<typeof this.findOne>>> {
        const user = await this.prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            throw new UnauthorizedException(
                `User with email ${email} not found`,
            );
        }

        return this.findOne(user.id);
    }

    async remove(id: number) {
        await this.prisma.user.findUniqueOrThrow({
            where: { id },
        });
        return this.prisma.user.delete({
            where: { id },
        });
    }

    async updateRefreshToken(
        userId: number,
        hashedToken: string,
    ): Promise<void> {
        await this.prisma.user.update({
            where: { id: userId },
            data: { hashedRefreshToken: hashedToken },
        });
    }

    async removeRefreshToken(
        userId: number,
        response: Response,
    ): Promise<void> {
        await this.prisma.user.update({
            where: { id: userId },
            data: { hashedRefreshToken: null },
        });

        response.clearCookie('access_token');
        response.clearCookie('refresh_token');

        await this.redisClient.del(`user-${userId}`);
    }
}
