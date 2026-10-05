import { IsNotEmpty, IsInt } from 'class-validator';

export class CreateUserHasTaskDto {
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @IsNotEmpty()
  @IsInt()
  taskId: number;
}
