import { CreateUserHasTaskDto } from '../dto/create-user-has-task.dto';

export class UserHasTask {
  constructor(createUserHasTaskDto: CreateUserHasTaskDto) {
    this.userId = createUserHasTaskDto.userId;
    this.taskId = createUserHasTaskDto.taskId;
  }

  userId: number;

  taskId: number;
}
