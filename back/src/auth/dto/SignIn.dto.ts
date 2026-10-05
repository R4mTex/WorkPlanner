import { IsNotEmpty, IsEmail, IsStrongPassword } from 'class-validator';

export class SignInDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  //@IsStrongPassword()
  password: string;
}
