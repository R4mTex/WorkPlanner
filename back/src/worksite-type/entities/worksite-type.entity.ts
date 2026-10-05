import { CreateWorksiteTypeDto } from '../dto/create-worksite-type.dto';

export class WorksiteType {
  static countWorksiteType = 0;

  constructor(createWorksiteTypeDto: CreateWorksiteTypeDto) {
    WorksiteType.countWorksiteType++;
    this.id = WorksiteType.countWorksiteType;
    this.name = createWorksiteTypeDto.name;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  id: number;

  name: string;

  createdAt: Date;

  updatedAt: Date;
}
