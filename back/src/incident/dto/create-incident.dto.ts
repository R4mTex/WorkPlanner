import { IncidentStatus } from '@prisma/client';
import {
    IsDateString,
    IsEnum,
    IsInt,
    IsNotEmpty,
    IsString,
} from 'class-validator';

export class CreateIncidentDto {
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
    @IsEnum(IncidentStatus)
    status: IncidentStatus;

    @IsNotEmpty()
    @IsInt()
    incidentTypeId: number;
}
