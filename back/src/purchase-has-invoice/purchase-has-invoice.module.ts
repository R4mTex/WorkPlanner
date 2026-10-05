import { Module } from '@nestjs/common';
import { PurchaseHasInvoiceService } from './purchase-has-invoice.service';
import { PurchaseHasInvoiceController } from './purchase-has-invoice.controller';

@Module({
  controllers: [PurchaseHasInvoiceController],
  providers: [PurchaseHasInvoiceService],
})
export class PurchaseHasInvoiceModule {}
