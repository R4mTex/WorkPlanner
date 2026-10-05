import { CreateInvoiceDto } from '../dto/create-invoice.dto';

export class Invoice {
  static countInvoice = 0;

  constructor(createInvoiceDto: CreateInvoiceDto) {
    Invoice.countInvoice++;
    this.id = Invoice.countInvoice;
    this.signedDocument = createInvoiceDto.signedDocument;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  id: number;

  signedDocument: string;

  createdAt: Date;

  updatedAt: Date;
}
