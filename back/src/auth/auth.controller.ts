import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    Req,
    Res,
    UnauthorizedException,
} from '@nestjs/common';

import { Request, Response } from 'express';

import { convertToMs } from 'src/function';
import { SignIn } from 'src/interface';
import { Public } from 'src/decorator/publicDecorator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';

import { AuthService } from './auth.service';

@Controller()
export class AuthController {
    constructor(
        private authService: AuthService,
        private readonly userService: UserService,
    ) {}

    @Public()
    @Post('signup')
    async create(
        @Body() createUserDto: CreateUserDto,
        @Res({ passthrough: true }) response: Response,
    ) {
        return this.userService.create(createUserDto, response);
    }

    @Public()
    @Post('login')
    async signIn(
        @Body() signInDto: SignIn,
        @Res({ passthrough: true }) response: Response,
    ) {
        console.log(
            'auth.controller - Login attempt : ',
            signInDto.email,
            signInDto.password,
        );
        return this.authService.signIn(
            signInDto.email,
            signInDto.password,
            response,
        );
    }

    @Public()
    @Post('refresh')
    async refresh(
        @Req() request: Request,
        @Res({ passthrough: true }) response: Response,
    ) {
        const refreshToken = request.cookies?.refresh_token;

        if (!refreshToken) {
            throw new UnauthorizedException('Authorization error 1');
        }

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
            await this.authService.refreshAccessToken(refreshToken);

        const accessExpire = process.env.JWT_ACCESS_EXPIRE;
        if (!accessExpire) {
            throw new Error('JWT_ACCESS_EXPIRE is not defined in .env');
        }

        response.cookie('access_token', newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: convertToMs(accessExpire),
        });

        const refreshExpire = process.env.JWT_REFRESH_EXPIRE;
        if (!refreshExpire) {
            throw new Error('JWT_ACCESS_EXPIRE is not defined in .env');
        }

        response.cookie('refresh_token', newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: convertToMs(refreshExpire),
        });

        return { access_token: newAccessToken };
    }

    @Public()
    @Get('cookies')
    getCookies(@Req() request: Request) {
        console.log('Cookies reçus côté serveur :', request.cookies);
        return request.cookies;
    }

    @Get('sessions/:userId')
    async getSessions(
        @Param('userId', ParseIntPipe) userId: number,
        @Req() request: Request,
    ) {
        if (!request.session) {
            throw new UnauthorizedException('Session not found.');
        }

        request.session.userId = userId;
        request.session.visits = request.session.visits
            ? request.session.visits + 1
            : 1;

        console.log(
            '@Get(sessions/:userId) Session reçus côté serveur :',
            request.session,
        );

        return {
            userId: request.session.userId,
            visits: request.session.visits,
        };
    }

    @Post('logout')
    logout(
        @Res({ passthrough: true }) response: Response,
        @Req() request: Request,
    ) {
        return this.authService.logout(response, request);
    }
}
