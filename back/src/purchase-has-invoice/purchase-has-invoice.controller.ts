import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PurchaseHasInvoiceService } from './purchase-has-invoice.service';
import { CreatePurchaseHasInvoiceDto } from './dto/create-purchase-has-invoice.dto';
import { UpdatePurchaseHasInvoiceDto } from './dto/update-purchase-has-invoice.dto';

@Controller('purchase-has-invoice')
export class PurchaseHasInvoiceController {
  constructor(private readonly purchaseHasInvoiceService: PurchaseHasInvoiceService) {}

  // @Post()
  // create(@Body() createPurchaseHasInvoiceDto: CreatePurchaseHasInvoiceDto) {
  //   return this.purchaseHasInvoiceService.create(createPurchaseHasInvoiceDto);
  // }

  // @Get()
  // findAll() {
  //   return this.purchaseHasInvoiceService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.purchaseHasInvoiceService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePurchaseHasInvoiceDto: UpdatePurchaseHasInvoiceDto) {
  //   return this.purchaseHasInvoiceService.update(+id, updatePurchaseHasInvoiceDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.purchaseHasInvoiceService.remove(+id);
  // }
}
