import { PartialType } from '@nestjs/mapped-types';
import { CreateUserHasWorkDto } from './create-user-has-work.dto';

export class UpdateUserHasWorkDto extends PartialType(CreateUserHasWorkDto) {}
