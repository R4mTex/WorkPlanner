import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserHasNotificationService } from './user-has-notification.service';
import { CreateUserHasNotificationDto } from './dto/create-user-has-notification.dto';
import { UpdateUserHasNotificationDto } from './dto/update-user-has-notification.dto';

@Controller('user-has-notification')
export class UserHasNotificationController {
  constructor(
    private readonly userHasNotificationService: UserHasNotificationService,
  ) {}

  // @Post()
  // create(@Body() createUserHasNotificationDto: CreateUserHasNotificationDto) {
  //   return this.userHasNotificationService.create(createUserHasNotificationDto);
  // }

  // @Get()
  // findAll() {
  //   return this.userHasNotificationService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userHasNotificationService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserHasNotificationDto: UpdateUserHasNotificationDto) {
  //   return this.userHasNotificationService.update(+id, updateUserHasNotificationDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userHasNotificationService.remove(+id);
  // }
}
