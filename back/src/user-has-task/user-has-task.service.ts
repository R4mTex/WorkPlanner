import { Injectable } from '@nestjs/common';
import { CreateUserHasTaskDto } from './dto/create-user-has-task.dto';
import { UpdateUserHasTaskDto } from './dto/update-user-has-task.dto';

@Injectable()
export class UserHasTaskService {
  create(createUserHasTaskDto: CreateUserHasTaskDto) {
    return 'This action adds a new userHasTask';
  }

  findAll() {
    return `This action returns all userHasTask`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userHasTask`;
  }

  update(id: number, updateUserHasTaskDto: UpdateUserHasTaskDto) {
    return `This action updates a #${id} userHasTask`;
  }

  remove(id: number) {
    return `This action removes a #${id} userHasTask`;
  }
}
