import { CreateTaskCategoryHasTaskTypeDto } from '../dto/create-task-category-has-task-type.dto';

export class TaskCategoryHasTaskType {
  constructor(
    createTaskCategoryHasTaskTypeDto: CreateTaskCategoryHasTaskTypeDto,
  ) {
    this.taskCategoryId = createTaskCategoryHasTaskTypeDto.taskCategoryId;
    this.taskTypeId = createTaskCategoryHasTaskTypeDto.taskTypeId;
  }

  taskCategoryId: number;

  taskTypeId: number;
}
