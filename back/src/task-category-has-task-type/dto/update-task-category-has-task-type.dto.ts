import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskCategoryHasTaskTypeDto } from './create-task-category-has-task-type.dto';

export class UpdateTaskCategoryHasTaskTypeDto extends PartialType(CreateTaskCategoryHasTaskTypeDto) {}
