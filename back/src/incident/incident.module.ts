import { Module } from '@nestjs/common';
import { IncidentService } from './incident.service';
import { IncidentController } from './incident.controller';

@Module({
  controllers: [IncidentController],
  providers: [IncidentService],
})
export class IncidentModule {}
