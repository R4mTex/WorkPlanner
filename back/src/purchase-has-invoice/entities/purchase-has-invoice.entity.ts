import { CreatePurchaseHasInvoiceDto } from '../dto/create-purchase-has-invoice.dto';

export class PurchaseHasInvoice {
  static countPurchaseHasInvoice = 0;

  constructor(createPurchaseHasInvoiceDto: CreatePurchaseHasInvoiceDto) {
    PurchaseHasInvoice.countPurchaseHasInvoice++;
    this.purchaseId = createPurchaseHasInvoiceDto.purchaseId;
    this.invoiceId = createPurchaseHasInvoiceDto.invoiceId;
  }

  purchaseId: number;

  invoiceId: number;
}
