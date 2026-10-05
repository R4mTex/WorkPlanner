import { CreateIncidentTypeDto } from '../dto/create-incident-type.dto';

export class IncidentType {
  static countIncidentType = 0;

  constructor(createIncidentTypeDto: CreateIncidentTypeDto) {
    IncidentType.countIncidentType++;
    this.id = IncidentType.countIncidentType;
    this.name = createIncidentTypeDto.name;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  id: number;

  name: string;

  createdAt: Date;

  updatedAt: Date;
}
