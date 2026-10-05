import { PartialType } from '@nestjs/mapped-types';
import { CreateIncidentHasIncidentTypeDto } from './create-incident-has-incident-type.dto';

export class UpdateIncidentHasIncidentTypeDto extends PartialType(CreateIncidentHasIncidentTypeDto) {}
