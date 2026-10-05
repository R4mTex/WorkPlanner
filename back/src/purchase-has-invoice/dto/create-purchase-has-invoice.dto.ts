import { IsNotEmpty, IsInt } from 'class-validator';

export class CreatePurchaseHasInvoiceDto {
  @IsNotEmpty()
  @IsInt()
  purchaseId: number;

  @IsNotEmpty()
  @IsInt()
  invoiceId: number;
}
