import { Injectable } from '@nestjs/common';
import { TaskCategory } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class TaskCategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<TaskCategory[]> {
    return await this.prisma.taskCategory.findMany({
      orderBy: {
        id: 'asc',
      },
    });
  }

  async findOne(id: number): Promise<TaskCategory | null> {
    return await this.prisma.taskCategory.findUnique({
      where: {
        id,
      },
    });
  }
}
