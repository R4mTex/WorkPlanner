import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ensureJwtSecretExists } from './auth/tools/generate-secret';
import { AllExceptionsFilter } from './exception/all-exceptions.filter';
import { PrismaClientExceptionFilter } from './exception/PrismaClient.exception.filter';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import { join } from 'path';
import * as express from 'express';

ensureJwtSecretExists();

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const { httpAdapter } = app.get(HttpAdapterHost);

    app.use(cookieParser());

    /*     app.use(
        session({
            secret: 'sfswgwsgwsh',
            resave: false,
            saveUninitialized: true,
            cookie: {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 3600000,
            },
        }),
    ); */

    app.useGlobalFilters(
        new AllExceptionsFilter(),
        new PrismaClientExceptionFilter(httpAdapter),
    );

    app.enableCors({
        origin: 'http://localhost:5173',
        credentials: true,
    });

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: false,
        }),
    );

    app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
