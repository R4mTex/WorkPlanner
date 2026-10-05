import { Injectable } from '@nestjs/common';
import { CreatePurchaseHasInvoiceDto } from './dto/create-purchase-has-invoice.dto';
import { UpdatePurchaseHasInvoiceDto } from './dto/update-purchase-has-invoice.dto';

@Injectable()
export class PurchaseHasInvoiceService {
  create(createPurchaseHasInvoiceDto: CreatePurchaseHasInvoiceDto) {
    return 'This action adds a new purchaseHasInvoice';
  }

  findAll() {
    return `This action returns all purchaseHasInvoice`;
  }

  findOne(id: number) {
    return `This action returns a #${id} purchaseHasInvoice`;
  }

  update(id: number, updatePurchaseHasInvoiceDto: UpdatePurchaseHasInvoiceDto) {
    return `This action updates a #${id} purchaseHasInvoice`;
  }

  remove(id: number) {
    return `This action removes a #${id} purchaseHasInvoice`;
  }
}
