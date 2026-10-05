import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskHasIncidentDto } from './create-task-has-incident.dto';

export class UpdateTaskHasIncidentDto extends PartialType(CreateTaskHasIncidentDto) {}
