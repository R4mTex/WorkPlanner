import { PartialType } from '@nestjs/mapped-types';
import { CreateUserParamsDto } from './create-user-params.dto';

export class UpdateUserParamsDto extends PartialType(CreateUserParamsDto) {}
