import { CreateIncidentDto } from '../dto/create-incident.dto';
import { IncidentStatus } from '@prisma/client';

export class Incident {
    static countIncident = 0;

    constructor(createIncidentDto: CreateIncidentDto) {
        Incident.countIncident++;
        this.id = Incident.countIncident;
        this.name = createIncidentDto.name;
        this.description = createIncidentDto.description;
        this.start = new Date();
        this.end = new Date();
        this.status = createIncidentDto.status;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    id: number;

    name: string;

    description: string;

    start: Date;

    end: Date;

    status: IncidentStatus;

    createdAt: Date;

    updatedAt: Date;
}
