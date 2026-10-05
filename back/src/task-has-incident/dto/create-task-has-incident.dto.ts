import { IsNotEmpty, IsInt } from 'class-validator';

export class CreateTaskHasIncidentDto {
  @IsNotEmpty()
  @IsInt()
  taskId: number;

  @IsNotEmpty()
  @IsInt()
  incidentId: number;
}
