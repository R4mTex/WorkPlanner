import { Test, TestingModule } from '@nestjs/testing';
import { WorkHasTradeController } from './work-has-trade.controller';
import { WorkHasTradeService } from './work-has-trade.service';

describe('WorkHasTradeController', () => {
  let controller: WorkHasTradeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkHasTradeController],
      providers: [WorkHasTradeService],
    }).compile();

    controller = module.get<WorkHasTradeController>(WorkHasTradeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
