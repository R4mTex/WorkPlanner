import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskTypeDto } from './create-task-type.dto';

export class UpdateTaskTypeDto extends PartialType(CreateTaskTypeDto) {}
