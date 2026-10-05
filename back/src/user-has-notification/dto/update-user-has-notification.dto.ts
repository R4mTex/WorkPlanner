import { PartialType } from '@nestjs/mapped-types';
import { CreateUserHasNotificationDto } from './create-user-has-notification.dto';

export class UpdateUserHasNotificationDto extends PartialType(CreateUserHasNotificationDto) {}
