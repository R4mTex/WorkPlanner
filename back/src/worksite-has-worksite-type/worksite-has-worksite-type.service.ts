import { Injectable } from '@nestjs/common';
import { CreateWorksiteHasWorksiteTypeDto } from './dto/create-worksite-has-worksite-type.dto';
import { UpdateWorksiteHasWorksiteTypeDto } from './dto/update-worksite-has-worksite-type.dto';

@Injectable()
export class WorksiteHasWorksiteTypeService {
  create(createWorksiteHasWorksiteTypeDto: CreateWorksiteHasWorksiteTypeDto) {
    return 'This action adds a new worksiteHasWorksiteType';
  }

  findAll() {
    return `This action returns all worksiteHasWorksiteType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} worksiteHasWorksiteType`;
  }

  update(id: number, updateWorksiteHasWorksiteTypeDto: UpdateWorksiteHasWorksiteTypeDto) {
    return `This action updates a #${id} worksiteHasWorksiteType`;
  }

  remove(id: number) {
    return `This action removes a #${id} worksiteHasWorksiteType`;
  }
}
