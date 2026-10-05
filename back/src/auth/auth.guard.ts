import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtAccessConstants } from './constants';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from 'src/decorator/publicDecorator';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(
            IS_PUBLIC_KEY,
            [context.getHandler(), context.getClass()],
        );
        if (isPublic) {
            return true;
        }

        const request = context.switchToHttp().getRequest();

        const accessToken = this.extractAccessTokenFromCookies(request);

        if (!accessToken) {
            throw new UnauthorizedException(
                'Access denied: no authentication token provided.',
            );
        }

        try {
            const payload = await this.jwtService.verifyAsync(accessToken, {
                secret: jwtAccessConstants.secret,
            });
            request['user'] = payload;
        } catch (error) {
            throw new UnauthorizedException(
                'Access denied: invalid or expired token.',
                error,
            );
        }

        return true;
    }

    private extractAccessTokenFromHeader(request: Request): string | undefined {
        const [type, accessToken] =
            request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? accessToken : undefined;
    }

    private extractAccessTokenFromCookies(
        request: Request,
    ): string | undefined {
        return request.cookies?.['access_token'];
    }
}
