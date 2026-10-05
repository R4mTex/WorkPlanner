import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseHasInvoiceService } from './purchase-has-invoice.service';

describe('PurchaseHasInvoiceService', () => {
  let service: PurchaseHasInvoiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PurchaseHasInvoiceService],
    }).compile();

    service = module.get<PurchaseHasInvoiceService>(PurchaseHasInvoiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
