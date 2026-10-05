import { CreateWorkHasTradeDto } from '../dto/create-work-has-trade.dto';

export class WorkHasTrade {
  constructor(createWorkHasTradeDto: CreateWorkHasTradeDto) {
    this.workId = createWorkHasTradeDto.workId;
    this.tradeId = createWorkHasTradeDto.tradeId;
  }

  workId: number;

  tradeId: number;
}
