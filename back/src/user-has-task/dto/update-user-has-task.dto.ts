import { PartialType } from '@nestjs/mapped-types';
import { CreateUserHasTaskDto } from './create-user-has-task.dto';

export class UpdateUserHasTaskDto extends PartialType(CreateUserHasTaskDto) {}
