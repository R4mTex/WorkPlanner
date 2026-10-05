import { Injectable } from '@nestjs/common';
import { CreateTaskHasIncidentDto } from './dto/create-task-has-incident.dto';
import { UpdateTaskHasIncidentDto } from './dto/update-task-has-incident.dto';

@Injectable()
export class TaskHasIncidentService {
  create(createTaskHasIncidentDto: CreateTaskHasIncidentDto) {
    return 'This action adds a new taskHasIncident';
  }

  findAll() {
    return `This action returns all taskHasIncident`;
  }

  findOne(id: number) {
    return `This action returns a #${id} taskHasIncident`;
  }

  update(id: number, updateTaskHasIncidentDto: UpdateTaskHasIncidentDto) {
    return `This action updates a #${id} taskHasIncident`;
  }

  remove(id: number) {
    return `This action removes a #${id} taskHasIncident`;
  }
}
