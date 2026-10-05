import { IsNotEmpty, IsInt } from 'class-validator';

export class CreateWorkHasTradeDto {
  @IsNotEmpty()
  @IsInt()
  workId: number;

  @IsNotEmpty()
  @IsInt()
  tradeId: number;
}
