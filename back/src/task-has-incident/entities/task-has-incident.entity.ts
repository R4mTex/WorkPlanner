import { CreateTaskHasIncidentDto } from '../dto/create-task-has-incident.dto';

export class TaskHasIncident {
  constructor(createTaskHasIncidentDto: CreateTaskHasIncidentDto) {
    this.taskId = createTaskHasIncidentDto.taskId;
    this.incidentId = createTaskHasIncidentDto.incidentId;
  }

  taskId: number;

  incidentId: number;
}
