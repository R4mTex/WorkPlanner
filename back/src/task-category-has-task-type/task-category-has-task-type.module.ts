import { Module } from '@nestjs/common';
import { TaskCategoryHasTaskTypeService } from './task-category-has-task-type.service';
import { TaskCategoryHasTaskTypeController } from './task-category-has-task-type.controller';

@Module({
  controllers: [TaskCategoryHasTaskTypeController],
  providers: [TaskCategoryHasTaskTypeService],
})
export class TaskCategoryHasTaskTypeModule {}
