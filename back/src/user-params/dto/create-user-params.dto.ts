import {
  IsNotEmpty,
  IsString,
  IsPhoneNumber,
  IsOptional,
  IsInt,
} from 'class-validator';

export class CreateUserParamsDto {
  @IsNotEmpty()
  @IsString()
  lastname: string;

  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsNotEmpty()
  @IsPhoneNumber('FR')
  phoneNumber: string;

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
