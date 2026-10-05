import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserParamsService } from './user-params.service';
import { CreateUserParamsDto } from './dto/create-user-params.dto';
import { UpdateUserParamsDto } from './dto/update-user-params.dto';

@Controller('user-params')
export class UserParamsController {
  constructor(private readonly userParamsService: UserParamsService) {}

  // @Post()
  // create(@Body() createUserParamDto: CreateUserParamsDto) {
  //   return this.userParamsService.create(createUserParamDto);
  // }

  // @Get()
  // findAll() {
  //   return this.userParamsService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userParamsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateUserParamDto: UpdateUserParamsDto,
  // ) {
  //   return this.userParamsService.update(+id, updateUserParamDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userParamsService.remove(+id);
  // }
}
