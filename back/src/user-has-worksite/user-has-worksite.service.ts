import { Injectable } from '@nestjs/common';
import { CreateUserHasWorksiteDto } from './dto/create-user-has-worksite.dto';
import { UpdateUserHasWorksiteDto } from './dto/update-user-has-worksite.dto';

@Injectable()
export class UserHasWorksiteService {
  create(createUserHasWorksiteDto: CreateUserHasWorksiteDto) {
    return 'This action adds a new userHasWorksite';
  }

  findAll() {
    return `This action returns all userHasWorksite`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userHasWorksite`;
  }

  update(id: number, updateUserHasWorksiteDto: UpdateUserHasWorksiteDto) {
    return `This action updates a #${id} userHasWorksite`;
  }

  remove(id: number) {
    return `This action removes a #${id} userHasWorksite`;
  }
}
