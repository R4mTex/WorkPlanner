import { PartialType } from '@nestjs/mapped-types';
import { CreateWorkHasTradeDto } from './create-work-has-trade.dto';

export class UpdateWorkHasTradeDto extends PartialType(CreateWorkHasTradeDto) {}
