import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { TaskCategoryService } from './task-category.service';

@Controller('task-category')
export class TaskCategoryController {
  constructor(private readonly taskCategoryService: TaskCategoryService) {}

  @Get()
  findAll() {
    return this.taskCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.taskCategoryService.findOne(id);
  }
}
