import { IsNotEmpty, IsInt } from 'class-validator';

export class CreateUserHasWorkDto {
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @IsNotEmpty()
  @IsInt()
  workId: number;
}
