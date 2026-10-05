import { Test, TestingModule } from '@nestjs/testing';
import { WorkHasTradeService } from './work-has-trade.service';

describe('WorkHasTradeService', () => {
  let service: WorkHasTradeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkHasTradeService],
    }).compile();

    service = module.get<WorkHasTradeService>(WorkHasTradeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
