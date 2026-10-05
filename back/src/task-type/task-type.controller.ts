import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { TaskTypeService } from './task-type.service';
// import { CreateTaskTypeDto } from './dto/create-task-type.dto';
// import { UpdateTaskTypeDto } from './dto/update-task-type.dto';

@Controller('task-type')
export class TaskTypeController {
  constructor(private readonly taskTypeService: TaskTypeService) {}

  // @Post()
  // create(@Body() createTaskTypeDto: CreateTaskTypeDto) {
  //   return this.taskTypeService.create(createTaskTypeDto);
  // }

  @Get()
  findAll() {
    return this.taskTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.taskTypeService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTaskTypeDto: UpdateTaskTypeDto) {
  //   return this.taskTypeService.update(+id, updateTaskTypeDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.taskTypeService.remove(+id);
  // }
}
