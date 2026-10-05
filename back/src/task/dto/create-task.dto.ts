import {
    IsNotEmpty,
    IsString,
    IsInt,
    IsEnum,
    IsDateString,
} from 'class-validator';
import { TaskStatus } from '@prisma/client';

export class CreateTaskDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsDateString()
    start: string;

    @IsNotEmpty()
    @IsDateString()
    end: string;


    @IsNotEmpty()
    @IsEnum(TaskStatus)
    status: TaskStatus;

    @IsNotEmpty()
    @IsInt()
    worksiteId: number;
}
