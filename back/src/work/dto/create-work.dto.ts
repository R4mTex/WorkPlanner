import { IsNotEmpty, IsEnum } from 'class-validator';
import { WorkCategory } from '@prisma/client';

export class CreateWorkDto {
  @IsNotEmpty()
  @IsEnum(WorkCategory)
  category: WorkCategory;
}
