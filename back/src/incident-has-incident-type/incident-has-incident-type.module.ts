import { Module } from '@nestjs/common';
import { IncidentHasIncidentTypeService } from './incident-has-incident-type.service';
import { IncidentHasIncidentTypeController } from './incident-has-incident-type.controller';

@Module({
  controllers: [IncidentHasIncidentTypeController],
  providers: [IncidentHasIncidentTypeService],
})
export class IncidentHasIncidentTypeModule {}
