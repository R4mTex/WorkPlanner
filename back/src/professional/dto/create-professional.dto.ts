import {
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsInt,
} from 'class-validator';

export class CreateProfessionalDto {
  @IsNotEmpty()
  @IsPhoneNumber()
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  managerName?: string;

  @IsNotEmpty()
  @IsString()
  legalStatus: string;

  @IsNotEmpty()
  @IsInt()
  workforce: number;

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
  city: string;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsInt()
  userId: number;
}
