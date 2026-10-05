import { Module } from '@nestjs/common';
import { WorkHasTradeService } from './work-has-trade.service';
import { WorkHasTradeController } from './work-has-trade.controller';

@Module({
  controllers: [WorkHasTradeController],
  providers: [WorkHasTradeService],
})
export class WorkHasTradeModule {}
