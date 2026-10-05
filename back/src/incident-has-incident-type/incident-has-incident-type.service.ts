import { Injectable } from '@nestjs/common';
import { CreateIncidentHasIncidentTypeDto } from './dto/create-incident-has-incident-type.dto';
import { UpdateIncidentHasIncidentTypeDto } from './dto/update-incident-has-incident-type.dto';

@Injectable()
export class IncidentHasIncidentTypeService {
  create(createIncidentHasIncidentTypeDto: CreateIncidentHasIncidentTypeDto) {
    
    return 'This action adds a new incidentHasIncidentType';
  }

  findAll() {
    return `This action returns all incidentHasIncidentType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} incidentHasIncidentType`;
  }

  update(id: number, updateIncidentHasIncidentTypeDto: UpdateIncidentHasIncidentTypeDto) {
    return `This action updates a #${id} incidentHasIncidentType`;
  }

  remove(id: number) {
    return `This action removes a #${id} incidentHasIncidentType`;
  }
}
