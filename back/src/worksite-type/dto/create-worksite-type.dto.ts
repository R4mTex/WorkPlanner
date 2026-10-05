import { IsNotEmpty, IsString } from 'class-validator';

export class CreateWorksiteTypeDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
