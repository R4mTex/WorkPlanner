import {
    IsNotEmpty,
    IsString,
    IsDate,
    IsInt,
    IsOptional,
    IsNumber,
    IsObject,
    IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';

class WorksiteTypeDto {
    @IsNotEmpty()
    @IsNumber()
    worksiteTypeId: number;
}

export class CreateWorksiteDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    start: Date;

    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    end: Date;

    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    duration: number;

    @IsString()
    formattedDuration: string;

    @IsOptional()
    @IsString()
    picture: string;

    @IsOptional()
    @IsString()
    streetNumber?: string;

    @IsNotEmpty()
    @IsString()
    streetName: string;

    @IsNotEmpty()
    @IsString()
    postalCode: string;

    @IsNotEmpty()
    @IsString()
    country: string;

    @IsNotEmpty()
    @IsString()
    city: string;

    @IsNotEmpty()
    @IsArray()
    worksiteTypes: WorksiteTypeDto[];
}
