import { CreateTaskCategoryDto } from '../dto/create-task-category.dto';
import { TaskCategoryEnum } from '@prisma/client';

export class TaskCategory {
  static countCategory = 0;

  constructor(createTaskCategoryDto: CreateTaskCategoryDto) {
    TaskCategory.countCategory++;
    this.id = TaskCategory.countCategory;
    this.category = createTaskCategoryDto.category;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  id: number;

  category: TaskCategoryEnum;

  createdAt: Date;

  updatedAt: Date;
}
