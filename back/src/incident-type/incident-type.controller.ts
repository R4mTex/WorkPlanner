import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { IncidentTypeService } from './incident-type.service';
@Controller('incident-type')
export class IncidentTypeController {
  constructor(private readonly incidentTypeService: IncidentTypeService) {}

  @Get()
  findAll() {
    return this.incidentTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.incidentTypeService.findOne(id);
  }

}
