import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IncidentHasIncidentTypeService } from './incident-has-incident-type.service';
import { CreateIncidentHasIncidentTypeDto } from './dto/create-incident-has-incident-type.dto';
import { UpdateIncidentHasIncidentTypeDto } from './dto/update-incident-has-incident-type.dto';

@Controller('incident-has-incident-type')
export class IncidentHasIncidentTypeController {
  constructor(private readonly incidentHasIncidentTypeService: IncidentHasIncidentTypeService) {}

  // @Post()
  // create(@Body() createIncidentHasIncidentTypeDto: CreateIncidentHasIncidentTypeDto) {
  //   return this.incidentHasIncidentTypeService.create(createIncidentHasIncidentTypeDto);
  // }

  // @Get()
  // findAll() {
  //   return this.incidentHasIncidentTypeService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.incidentHasIncidentTypeService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateIncidentHasIncidentTypeDto: UpdateIncidentHasIncidentTypeDto) {
  //   return this.incidentHasIncidentTypeService.update(+id, updateIncidentHasIncidentTypeDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.incidentHasIncidentTypeService.remove(+id);
  // }
}
