import { IsNotEmpty, IsEmail, IsInt } from 'class-validator';

export class CreateWorksiteInvitationDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsInt()
  worksiteId: number;
}
