import { IsNotEmpty, IsInt } from 'class-validator';

export class CreateTaskCategoryHasTaskTypeDto {
  @IsNotEmpty()
  @IsInt()
  taskCategoryId: number;

  @IsNotEmpty()
  @IsInt()
  taskTypeId: number;
}
