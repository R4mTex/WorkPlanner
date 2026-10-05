import { Module } from '@nestjs/common';
import { TaskHasIncidentService } from './task-has-incident.service';
import { TaskHasIncidentController } from './task-has-incident.controller';

@Module({
  controllers: [TaskHasIncidentController],
  providers: [TaskHasIncidentService],
})
export class TaskHasIncidentModule {}
