import { Injectable } from '@nestjs/common';
import { CreateUserHasNotificationDto } from './dto/create-user-has-notification.dto';
import { UpdateUserHasNotificationDto } from './dto/update-user-has-notification.dto';

@Injectable()
export class UserHasNotificationService {
  create(createUserHasNotificationDto: CreateUserHasNotificationDto) {
    return 'This action adds a new userHasNotification';
  }

  findAll() {
    return `This action returns all userHasNotification`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userHasNotification`;
  }

  update(id: number, updateUserHasNotificationDto: UpdateUserHasNotificationDto) {
    return `This action updates a #${id} userHasNotification`;
  }

  remove(id: number) {
    return `This action removes a #${id} userHasNotification`;
  }
}
