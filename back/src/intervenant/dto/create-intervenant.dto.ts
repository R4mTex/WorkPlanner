import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { IntervenantStatus } from '@prisma/client';

export class CreateIntervenantDto {
    @IsNotEmpty()
    @IsString()
    lastname: string;

    @IsNotEmpty()
    @IsString()
    firstname: string;

    @IsOptional()
    @IsString()
    phoneNumber: string;

    @IsOptional()
    @IsString()
    email: string;

    @IsOptional()
    @IsString()
    streetName: string;

    @IsOptional()
    @IsString()
    postalCode: string;

    @IsOptional()
    @IsString()
    city: string;

    @IsOptional()
    status: IntervenantStatus = IntervenantStatus.Disponible;
}
