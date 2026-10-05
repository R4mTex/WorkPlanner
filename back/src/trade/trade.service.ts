import { Injectable } from '@nestjs/common';
import { Trade } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class TradeService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Trade[]> {
    return this.prisma.trade.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }

  async findOne(id: number): Promise<Trade | null> {
    return this.prisma.trade.findUnique({
      where: { id },
    });
  }
}
