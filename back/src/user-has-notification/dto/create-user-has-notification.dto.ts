import { IsNotEmpty, IsInt } from 'class-validator';

export class CreateUserHasNotificationDto {
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @IsNotEmpty()
  @IsInt()
  notificationId: number;
}
