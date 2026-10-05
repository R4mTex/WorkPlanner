import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserHasTaskService } from './user-has-task.service';
import { CreateUserHasTaskDto } from './dto/create-user-has-task.dto';
import { UpdateUserHasTaskDto } from './dto/update-user-has-task.dto';

@Controller('user-has-task')
export class UserHasTaskController {
  constructor(private readonly userHasTaskService: UserHasTaskService) {}

  // @Post()
  // create(@Body() createUserHasTaskDto: CreateUserHasTaskDto) {
  //   return this.userHasTaskService.create(createUserHasTaskDto);
  // }

  // @Get()
  // findAll() {
  //   return this.userHasTaskService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userHasTaskService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserHasTaskDto: UpdateUserHasTaskDto) {
  //   return this.userHasTaskService.update(+id, updateUserHasTaskDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userHasTaskService.remove(+id);
  // }
}
