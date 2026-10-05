import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Filters } from 'src/interface';
import { Prisma, Purchase } from '@prisma/client';

interface PurchaseFilters extends Filters {
  minPrice?: number;
  maxPrice?: number;
}
const purchaseWithRelations = Prisma.validator<Prisma.PurchaseDefaultArgs>()({
  include: {
    invoices: {
      include: {
        invoice: true,
      },
    },
  },
});

type PurchaseWithRelations = Prisma.PurchaseGetPayload<
  typeof purchaseWithRelations
>;

@Injectable()
export class PurchaseService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPurchaseDto: CreatePurchaseDto): Promise<Purchase> {
    return await this.prisma.purchase.create({
      data: createPurchaseDto,
    });
  }

  async findOne(id: number): Promise<PurchaseWithRelations | null> {
    return await this.prisma.purchase.findUnique({
      include: {
        invoices: {
          include: {
            invoice: true,
          },
        },
      },
      where: { id },
    });
  }

  async update(
    id: number,
    updatePurchaseDto: Partial<UpdatePurchaseDto>,
  ): Promise<Purchase> {
    await this.prisma.purchase.findUniqueOrThrow({
      where: { id },
    });

    return this.prisma.purchase.update({
      where: { id },
      data: updatePurchaseDto,
    });
  }

  async remove(id: number): Promise<Purchase> {
    return this.prisma.purchase.delete({
      where: { id },
    });
  }

  async findByFilters(
    filters: PurchaseFilters,
  ): Promise<PurchaseWithRelations[] | { message: string }> {
    const where: any = {};
    const orderBy: any = {};
    orderBy.createdAt = orderBy.createdAt || 'asc';
    for (const [key, value] of Object.entries(filters)) {
      switch (key) {
        case 'name':
          if (value) {
            where.name = {
              contains: value,
            };
          }
          break;

        case 'minPrice':
          if (value !== undefined) {
            where.price = where.price || {};
            where.price.gte = value;
          }
          break;

        case 'maxPrice':
          if (value !== undefined) {
            where.price = where.price || {};
            where.price.lte = value;
          }
          break;

        case 'sortOrder':
          if (value) {
            orderBy.createdAt = value;
          }
          break;
      }
    }

    const purchases = await this.prisma.purchase.findMany({
      include: {
        invoices: {
          include: {
            invoice: true,
          },
        },
      },
      where,
      orderBy,
    });

    // if (purchases.length === 0) {
    //   return {
    //     message: 'Aucun purchase trouvé avec les critères spécifiés',
    //   };
    // }

    return purchases;
  }
}
