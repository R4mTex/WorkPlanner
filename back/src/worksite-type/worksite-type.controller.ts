import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { WorksiteTypeService } from './worksite-type.service';

@Controller('worksite-type')
export class WorksiteTypeController {
  constructor(private readonly worksiteTypeService: WorksiteTypeService) {}

  @Get()
  findAll() {
    return this.worksiteTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.worksiteTypeService.findOne(+id);
  }
}
