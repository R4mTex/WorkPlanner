import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TaskCategoryHasTaskTypeService } from './task-category-has-task-type.service';
import { CreateTaskCategoryHasTaskTypeDto } from './dto/create-task-category-has-task-type.dto';
import { UpdateTaskCategoryHasTaskTypeDto } from './dto/update-task-category-has-task-type.dto';

@Controller('task-category-has-task-type')
export class TaskCategoryHasTaskTypeController {
  constructor(
    private readonly taskCategoryHasTaskTypeService: TaskCategoryHasTaskTypeService,
  ) {}

  // @Post()
  // create(@Body() createTaskCategoryHasTaskTypeDto: CreateTaskCategoryHasTaskTypeDto) {
  //   return this.taskCategoryHasTaskTypeService.create(createTaskCategoryHasTaskTypeDto);
  // }

  // @Get()
  // findAll() {
  //   return this.taskCategoryHasTaskTypeService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.taskCategoryHasTaskTypeService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTaskCategoryHasTaskTypeDto: UpdateTaskCategoryHasTaskTypeDto) {
  //   return this.taskCategoryHasTaskTypeService.update(+id, updateTaskCategoryHasTaskTypeDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.taskCategoryHasTaskTypeService.remove(+id);
  // }
}
