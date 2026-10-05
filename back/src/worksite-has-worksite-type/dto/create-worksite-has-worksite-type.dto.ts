import { IsNotEmpty, IsInt } from 'class-validator';

export class CreateWorksiteHasWorksiteTypeDto {
  @IsNotEmpty()
  @IsInt()
  worksiteId: number;

  @IsNotEmpty()
  @IsInt()
  worksiteTypeId: number;
}
