import { Injectable } from '@nestjs/common';
import { IncidentType } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class IncidentTypeService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<IncidentType[]> {
    return this.prisma.incidentType.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  async findOne(id: number): Promise<IncidentType | null> {
    return this.prisma.incidentType.findUnique({
      where: { id },
    });
  }
}
