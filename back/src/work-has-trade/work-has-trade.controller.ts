import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WorkHasTradeService } from './work-has-trade.service';
import { CreateWorkHasTradeDto } from './dto/create-work-has-trade.dto';
import { UpdateWorkHasTradeDto } from './dto/update-work-has-trade.dto';

@Controller('work-has-trade')
export class WorkHasTradeController {
  constructor(private readonly workHasTradeService: WorkHasTradeService) {}

  // @Post()
  // create(@Body() createWorkHasTradeDto: CreateWorkHasTradeDto) {
  //   return this.workHasTradeService.create(createWorkHasTradeDto);
  // }

  // @Get()
  // findAll() {
  //   return this.workHasTradeService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.workHasTradeService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateWorkHasTradeDto: UpdateWorkHasTradeDto) {
  //   return this.workHasTradeService.update(+id, updateWorkHasTradeDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.workHasTradeService.remove(+id);
  // }
}
