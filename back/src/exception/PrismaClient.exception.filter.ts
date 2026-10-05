import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

enum PrismaErrorEnum {
  UniqueConstraintFailed = 'P2002',
  ForeignKeyConstraintFailed = 'P2003',
  RecordNotFound = 'P2025',
}

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(
    exception: Prisma.PrismaClientKnownRequestError,
    host: ArgumentsHost,
  ): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    switch (exception.code) {
      case PrismaErrorEnum.UniqueConstraintFailed: {
        const status = HttpStatus.CONFLICT;
        const fields = (exception.meta?.target as string[]) || [];

        response.status(status).json({
          statusCode: status,
          errorCode: 'UNIQUE_CONSTRAINT_FAILED',
          message: `Unique constraint failed on: ${fields.join(', ')}`,
        });
        break;
      }

      case PrismaErrorEnum.ForeignKeyConstraintFailed: {
        const status = HttpStatus.BAD_REQUEST;
        response.status(status).json({
          statusCode: status,
          errorCode: 'FOREIGN_KEY_CONSTRAINT_FAILED',
          message: `Foreign key constraint failed: ${exception.meta?.field_name || 'unknown field'}`,
        });
        break;
      }

      case PrismaErrorEnum.RecordNotFound: {
        const status = HttpStatus.NOT_FOUND;

        response.status(status).json({
          statusCode: status,
          errorCode: 'NOT_FOUND',
          message: 'Record not found',
        });
        break;
      }

      default: {
        console.error(exception.code);
        console.error(exception.meta);
        super.catch(exception, host);
        break;
      }
    }
  }
}
