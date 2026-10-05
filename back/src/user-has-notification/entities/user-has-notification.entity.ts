import { CreateUserHasNotificationDto } from '../dto/create-user-has-notification.dto';

export class UserHasNotification {
  static countUserHasNotification = 0;

  constructor(createUserHasNotificationDto: CreateUserHasNotificationDto) {
    UserHasNotification.countUserHasNotification++;
    this.userId = createUserHasNotificationDto.userId;
    this.notificationId = createUserHasNotificationDto.notificationId;
  }

  userId: number;

  notificationId: number;
}
