import { CreateWorksiteHasWorksiteTypeDto } from '../dto/create-worksite-has-worksite-type.dto';

export class WorksiteHasWorksiteType {
  constructor(
    createWorksiteHasWorksiteTypeDto: CreateWorksiteHasWorksiteTypeDto,
  ) {
    this.worksiteId = createWorksiteHasWorksiteTypeDto.worksiteId;
    this.worksiteTypeId = createWorksiteHasWorksiteTypeDto.worksiteTypeId;
  }

  worksiteId: number;

  worksiteTypeId: number;
}
