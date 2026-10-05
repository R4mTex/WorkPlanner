import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseHasInvoiceController } from './purchase-has-invoice.controller';
import { PurchaseHasInvoiceService } from './purchase-has-invoice.service';

describe('PurchaseHasInvoiceController', () => {
  let controller: PurchaseHasInvoiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PurchaseHasInvoiceController],
      providers: [PurchaseHasInvoiceService],
    }).compile();

    controller = module.get<PurchaseHasInvoiceController>(PurchaseHasInvoiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
