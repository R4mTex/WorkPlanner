import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WorksiteHasWorksiteTypeService } from './worksite-has-worksite-type.service';
import { CreateWorksiteHasWorksiteTypeDto } from './dto/create-worksite-has-worksite-type.dto';
import { UpdateWorksiteHasWorksiteTypeDto } from './dto/update-worksite-has-worksite-type.dto';

@Controller('worksite-has-worksite-type')
export class WorksiteHasWorksiteTypeController {
  constructor(
    private readonly worksiteHasWorksiteTypeService: WorksiteHasWorksiteTypeService,
  ) {}

  // @Post()
  // create(@Body() createWorksiteHasWorksiteTypeDto: CreateWorksiteHasWorksiteTypeDto) {
  //   return this.worksiteHasWorksiteTypeService.create(createWorksiteHasWorksiteTypeDto);
  // }

  // @Get()
  // findAll() {
  //   return this.worksiteHasWorksiteTypeService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.worksiteHasWorksiteTypeService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateWorksiteHasWorksiteTypeDto: UpdateWorksiteHasWorksiteTypeDto) {
  //   return this.worksiteHasWorksiteTypeService.update(+id, updateWorksiteHasWorksiteTypeDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.worksiteHasWorksiteTypeService.remove(+id);
  // }
}
