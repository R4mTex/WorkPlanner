import { PartialType } from '@nestjs/mapped-types';
import { CreateUserHasWorksiteDto } from './create-user-has-worksite.dto';

export class UpdateUserHasWorksiteDto extends PartialType(CreateUserHasWorksiteDto) {}
