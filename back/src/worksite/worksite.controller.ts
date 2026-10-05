import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseIntPipe,
    Req,
    UseGuards,
    Inject,
    Query,
    BadRequestException,
} from '@nestjs/common';
import { WorksiteService } from './worksite.service';
import { CreateWorksiteDto } from './dto/create-worksite.dto';
import { UpdateWorksiteDto } from './dto/update-worksite.dto';

@Controller('worksite')
export class WorksiteController {
    constructor(private readonly worksiteService: WorksiteService) {}

    @Post()
    create(@Req() req, @Body() createWorksiteDto: CreateWorksiteDto) {
        const userId = req.user.sub;
        return this.worksiteService.create(userId, createWorksiteDto);
    }

    @Get()
    async findAll(
        @Req() request,
        @Query('name') name?: string,
        @Query('city') city?: string,
        @Query('duration') duration?: string,
        @Query('start') start?: string,
        @Query('end') end?: string,
        @Query('sortOrder') sortOrder?: 'asc' | 'desc',
    ) {
        const durationNumber = duration ? parseInt(duration, 10) : undefined;

        const userId = request.user.sub;
        console.log('worksite.constroller - userId : ', userId);

        console.log('Requête reçue depuis Cypress :', request.headers);
        console.log('User dans la requête :', request.user);

        return this.worksiteService.findAll(userId, {
            name,
            city,
            duration: durationNumber,
            start,
            end,
            sortOrder,
        });
    }

    @Get(':id')
    async findOne(@Req() req, @Param('id', ParseIntPipe) id: number) {
        const userId = req.user.sub;
        return this.worksiteService.findOne(userId, id);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateWorksiteDto: UpdateWorksiteDto,
    ) {
        console.log('DTO reçu dans le controller :', updateWorksiteDto);
        return this.worksiteService.update(id, updateWorksiteDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.worksiteService.remove(id);
    }
}
