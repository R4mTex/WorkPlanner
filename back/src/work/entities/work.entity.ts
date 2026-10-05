import { CreateWorkDto } from '../dto/create-work.dto';
import { WorkCategory } from '@prisma/client';

export class Work {
  static countWork = 0;

  constructor(createWorkDto: CreateWorkDto) {
    Work.countWork++;
    this.id = Work.countWork;
    this.category = createWorkDto.category;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  id: number;

  category: WorkCategory;

  createdAt: Date;

  updatedAt: Date;
}
