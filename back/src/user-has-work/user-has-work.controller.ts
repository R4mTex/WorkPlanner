import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserHasWorkService } from './user-has-work.service';
import { CreateUserHasWorkDto } from './dto/create-user-has-work.dto';
import { UpdateUserHasWorkDto } from './dto/update-user-has-work.dto';

@Controller('user-has-work')
export class UserHasWorkController {
  constructor(private readonly userHasWorkService: UserHasWorkService) {}

  // @Post()
  // create(@Body() createUserHasWorkDto: CreateUserHasWorkDto) {
  //   return this.userHasWorkService.create(createUserHasWorkDto);
  // }

  // @Get()
  // findAll() {
  //   return this.userHasWorkService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userHasWorkService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserHasWorkDto: UpdateUserHasWorkDto) {
  //   return this.userHasWorkService.update(+id, updateUserHasWorkDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userHasWorkService.remove(+id);
  // }
}
