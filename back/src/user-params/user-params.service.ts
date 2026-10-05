import { Injectable } from '@nestjs/common';
import { CreateUserParamsDto } from './dto/create-user-params.dto';
import { UpdateUserParamsDto } from './dto/update-user-params.dto';

@Injectable()
export class UserParamsService {
  create(createUserParamDto: CreateUserParamsDto) {
    return 'This action adds a new userParam';
  }

  findAll() {
    return `This action returns all userParams`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userParam`;
  }

  update(id: number, updateUserParamDto: UpdateUserParamsDto) {
    return `This action updates a #${id} userParam`;
  }

  remove(id: number) {
    return `This action removes a #${id} userParam`;
  }
}
