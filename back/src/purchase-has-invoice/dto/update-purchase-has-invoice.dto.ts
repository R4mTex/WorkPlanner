import { PartialType } from '@nestjs/mapped-types';
import { CreatePurchaseHasInvoiceDto } from './create-purchase-has-invoice.dto';

export class UpdatePurchaseHasInvoiceDto extends PartialType(CreatePurchaseHasInvoiceDto) {}
