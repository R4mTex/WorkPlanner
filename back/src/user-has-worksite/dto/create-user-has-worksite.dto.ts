import { IsNotEmpty, IsInt } from 'class-validator';

export class CreateUserHasWorksiteDto {
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @IsNotEmpty()
  @IsInt()
  worksiteId: number;
}
