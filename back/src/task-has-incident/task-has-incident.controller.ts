import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TaskHasIncidentService } from './task-has-incident.service';
import { CreateTaskHasIncidentDto } from './dto/create-task-has-incident.dto';
import { UpdateTaskHasIncidentDto } from './dto/update-task-has-incident.dto';

@Controller('task-has-incident')
export class TaskHasIncidentController {
  constructor(
    private readonly taskHasIncidentService: TaskHasIncidentService,
  ) {}

  // @Post()
  // create(@Body() createTaskHasIncidentDto: CreateTaskHasIncidentDto) {
  //   return this.taskHasIncidentService.create(createTaskHasIncidentDto);
  // }

  // @Get()
  // findAll() {
  //   return this.taskHasIncidentService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.taskHasIncidentService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateTaskHasIncidentDto: UpdateTaskHasIncidentDto,
  // ) {
  //   return this.taskHasIncidentService.update(+id, updateTaskHasIncidentDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.taskHasIncidentService.remove(+id);
  // }
}
