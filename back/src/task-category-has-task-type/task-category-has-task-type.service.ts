import { Injectable } from '@nestjs/common';
import { CreateTaskCategoryHasTaskTypeDto } from './dto/create-task-category-has-task-type.dto';
import { UpdateTaskCategoryHasTaskTypeDto } from './dto/update-task-category-has-task-type.dto';

@Injectable()
export class TaskCategoryHasTaskTypeService {
  create(createTaskCategoryHasTaskTypeDto: CreateTaskCategoryHasTaskTypeDto) {
    return 'This action adds a new taskCategoryHasTaskType';
  }

  findAll() {
    return `This action returns all taskCategoryHasTaskType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} taskCategoryHasTaskType`;
  }

  update(id: number, updateTaskCategoryHasTaskTypeDto: UpdateTaskCategoryHasTaskTypeDto) {
    return `This action updates a #${id} taskCategoryHasTaskType`;
  }

  remove(id: number) {
    return `This action removes a #${id} taskCategoryHasTaskType`;
  }
}
