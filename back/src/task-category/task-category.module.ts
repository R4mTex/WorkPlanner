import { Module } from '@nestjs/common';
import { TaskCategoryService } from './task-category.service';
import { TaskCategoryController } from './task-category.controller';

@Module({
  controllers: [TaskCategoryController],
  providers: [TaskCategoryService],
})
export class TaskCategoryModule {}
