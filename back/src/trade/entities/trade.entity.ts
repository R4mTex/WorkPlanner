import { CreateTradeDto } from '../dto/create-trade.dto';

export class Trade {
  static countTrade = 0;

  constructor(createTradeDto: CreateTradeDto) {
    Trade.countTrade++;
    this.id = Trade.countTrade;
    this.name = createTradeDto.name;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  id: number;

  name: string;

  createdAt: Date;

  updatedAt: Date;
}
