import { Injectable } from '@nestjs/common';
import { Work } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
@Injectable()
export class WorkService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Work[]> {
    return await this.prisma.work.findMany({
      include: {
        workHasTrade: {
          include: {
            trade: true,
          },
        },
      },
      orderBy: {
        category: 'asc',
      },
    });
  }

  async findOne(id: number): Promise<Work | null> {
    return await this.prisma.work.findUnique({
      include: {
        workHasTrade: {
          include: {
            trade: true,
          },
        },
      },
      where: { id },
    });
  }
}
