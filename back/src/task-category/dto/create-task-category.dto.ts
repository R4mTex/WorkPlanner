import { IsNotEmpty, IsEnum } from 'class-validator';
import { TaskCategoryEnum } from '@prisma/client';

export class CreateTaskCategoryDto {
  @IsNotEmpty()
  @IsEnum(TaskCategoryEnum)
  category: TaskCategoryEnum;
}
