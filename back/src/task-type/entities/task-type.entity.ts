import { CreateTaskTypeDto } from '../dto/create-task-type.dto';

export class TaskType {
  static countTaskType = 0;

  constructor(createTaskTypeDto: CreateTaskTypeDto) {
    TaskType.countTaskType++;
    this.id = TaskType.countTaskType;
    this.name = createTaskTypeDto.name;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  id: number;

  name: string;

  createdAt: Date;

  updatedAt: Date;
}
