import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
    imports: [
        UserModule,
        CacheModule.register(),
        JwtModule.register({
            global: true,
            secret: process.env.JWT_ACCESS_SECRET_KEY,
            signOptions: { expiresIn: process.env.JWT_ACCESS_EXPIRE },
        }),
    ],
    providers: [AuthService, UserService],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule {}
