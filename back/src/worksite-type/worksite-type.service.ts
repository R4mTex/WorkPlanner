import { Injectable } from '@nestjs/common';
import { WorksiteType } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class WorksiteTypeService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<WorksiteType[]> {
    return this.prisma.worksiteType.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }

  async findOne(id: number): Promise<WorksiteType | null> {
    return this.prisma.worksiteType.findUnique({
      where: { id },
    });
  }
}
