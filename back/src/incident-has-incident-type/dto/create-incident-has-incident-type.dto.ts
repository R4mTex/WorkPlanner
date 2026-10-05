import { IsNotEmpty, IsInt } from 'class-validator';

export class CreateIncidentHasIncidentTypeDto {
  @IsNotEmpty()
  @IsInt()
  incidentId: number;

  @IsNotEmpty()
  @IsInt()
  incidentTypeId: number;
}
