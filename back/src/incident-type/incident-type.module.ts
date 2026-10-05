import { Module } from '@nestjs/common';
import { IncidentTypeService } from './incident-type.service';
import { IncidentTypeController } from './incident-type.controller';

@Module({
  controllers: [IncidentTypeController],
  providers: [IncidentTypeService],
})
export class IncidentTypeModule {}
