import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { WorksiteInvitationService } from './worksite-invitation.service';
import { CreateWorksiteInvitationDto } from './dto/create-worksite-invitation.dto';

@Controller('worksite-invitation')
export class WorksiteInvitationController {
  constructor(
    private readonly worksiteInvitationService: WorksiteInvitationService,
  ) {}

  @Post()
  create(@Body() createWorksiteInvitationDto: CreateWorksiteInvitationDto) {
    return this.worksiteInvitationService.create(createWorksiteInvitationDto);
  }

  @Get()
  findAll() {
    return this.worksiteInvitationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.worksiteInvitationService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.worksiteInvitationService.remove(id);
  }
}
