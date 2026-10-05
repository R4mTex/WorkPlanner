import { CreateIncidentHasIncidentTypeDto } from '../dto/create-incident-has-incident-type.dto';

export class IncidentHasIncidentType {
  constructor(
    createIncidentHasIncidentTypeDto: CreateIncidentHasIncidentTypeDto,
  ) {
    this.incidentId = createIncidentHasIncidentTypeDto.incidentId;
    this.incidentTypeId = createIncidentHasIncidentTypeDto.incidentTypeId;
  }

  incidentId: number;

  incidentTypeId: number;
}
