import { Module } from '@nestjs/common';
import { UserHasNotificationService } from './user-has-notification.service';
import { UserHasNotificationController } from './user-has-notification.controller';

@Module({
  controllers: [UserHasNotificationController],
  providers: [UserHasNotificationService],
})
export class UserHasNotificationModule {}
