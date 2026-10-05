import { Injectable } from '@nestjs/common';
import { CreateUserHasWorkDto } from './dto/create-user-has-work.dto';
import { UpdateUserHasWorkDto } from './dto/update-user-has-work.dto';

@Injectable()
export class UserHasWorkService {
  create(createUserHasWorkDto: CreateUserHasWorkDto) {
    return 'This action adds a new userHasWork';
  }

  findAll() {
    return `This action returns all userHasWork`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userHasWork`;
  }

  update(id: number, updateUserHasWorkDto: UpdateUserHasWorkDto) {
    return `This action updates a #${id} userHasWork`;
  }

  remove(id: number) {
    return `This action removes a #${id} userHasWork`;
  }
}
