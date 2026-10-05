import { PartialType } from '@nestjs/mapped-types';
import { CreateIncidentTypeDto } from './create-incident-type.dto';

export class UpdateIncidentTypeDto extends PartialType(CreateIncidentTypeDto) {}
