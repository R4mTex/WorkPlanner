import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserHasWorksiteService } from './user-has-worksite.service';
import { CreateUserHasWorksiteDto } from './dto/create-user-has-worksite.dto';
import { UpdateUserHasWorksiteDto } from './dto/update-user-has-worksite.dto';

@Controller('user-has-worksite')
export class UserHasWorksiteController {
  constructor(
    private readonly userHasWorksiteService: UserHasWorksiteService,
  ) {}

  // @Post()
  // create(@Body() createUserHasWorksiteDto: CreateUserHasWorksiteDto) {
  //   return this.userHasWorksiteService.create(createUserHasWorksiteDto);
  // }

  // @Get()
  // findAll() {
  //   return this.userHasWorksiteService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userHasWorksiteService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserHasWorksiteDto: UpdateUserHasWorksiteDto) {
  //   return this.userHasWorksiteService.update(+id, updateUserHasWorksiteDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userHasWorksiteService.remove(+id);
  // }
}
