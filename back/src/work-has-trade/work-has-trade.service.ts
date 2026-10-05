import { Injectable } from '@nestjs/common';
import { CreateWorkHasTradeDto } from './dto/create-work-has-trade.dto';
import { UpdateWorkHasTradeDto } from './dto/update-work-has-trade.dto';

@Injectable()
export class WorkHasTradeService {
  create(createWorkHasTradeDto: CreateWorkHasTradeDto) {
    return 'This action adds a new workHasTrade';
  }

  findAll() {
    return `This action returns all workHasTrade`;
  }

  findOne(id: number) {
    return `This action returns a #${id} workHasTrade`;
  }

  update(id: number, updateWorkHasTradeDto: UpdateWorkHasTradeDto) {
    return `This action updates a #${id} workHasTrade`;
  }

  remove(id: number) {
    return `This action removes a #${id} workHasTrade`;
  }
}
