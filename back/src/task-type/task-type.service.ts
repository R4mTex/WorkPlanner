import { Injectable } from '@nestjs/common';
import { TaskType } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { existingId } from 'src/function';
// import { CreateTaskTypeDto } from './dto/create-task-type.dto';
// import { UpdateTaskTypeDto } from './dto/update-task-type.dto';

@Injectable()
export class TaskTypeService {
  constructor(private readonly prisma: PrismaService) {}


  async findAll(): Promise<TaskType[]> {
    return await this.prisma.taskType.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }

  async findOne(id: number): Promise<TaskType | null> {
    return await this.prisma.taskType.findUnique({
      where: { id },
    });
  }

}
