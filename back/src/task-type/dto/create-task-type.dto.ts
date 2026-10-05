import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskTypeDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
