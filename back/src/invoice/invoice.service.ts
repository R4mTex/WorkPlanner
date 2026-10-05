import { Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Invoice } from '@prisma/client';

@Injectable()
export class InvoiceService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createInvoiceDto: CreateInvoiceDto,
    purchaseId: number,
  ): Promise<Invoice> {
    const invoice = await this.prisma.invoice.create({
      data: createInvoiceDto,
    });

    await this.prisma.purchaseHasInvoice.create({
      data: {
        invoiceId: invoice.id,
        purchaseId: purchaseId,
      },
    });

    return invoice;
  }

  async findAll(): Promise<Invoice[]> {
    return this.prisma.invoice.findMany({
      orderBy: {
        id: 'asc',
      },
    });
  }

  async findOne(id: number): Promise<Invoice | null> {
    return this.prisma.invoice.findUnique({
      where: { id },
    });
  }

  async update(
    id: number,
    updateInvoiceDto: Partial<UpdateInvoiceDto>,
  ): Promise<Invoice> {
    return this.prisma.invoice.update({
      where: { id },
      data: updateInvoiceDto,
    });
  }

  async remove(id: number): Promise<Invoice> {
    return this.prisma.invoice.delete({
      where: { id },
    });
  }
}
