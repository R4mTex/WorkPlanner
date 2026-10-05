import {
    IsNotEmpty,
    IsString,
    IsEnum,
    IsBoolean,
    IsInt,
} from 'class-validator';
import { NotificationTag } from '@prisma/client';

export class CreateNotificationDto {
    @IsNotEmpty()
    @IsEnum(NotificationTag)
    tag: NotificationTag;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    author: string;

    @IsNotEmpty()
    @IsBoolean()
    read: boolean;

    @IsNotEmpty()
    @IsInt()
    worksiteId: number;

    @IsNotEmpty()
    @IsString()
    createdAt: string;

    @IsNotEmpty()
    @IsString()
    updatedAt: string;
}
