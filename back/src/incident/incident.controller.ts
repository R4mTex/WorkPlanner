import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseIntPipe,
    Query,
    BadRequestException,
} from '@nestjs/common';
import { IncidentService } from './incident.service';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { UpdateIncidentDto } from './dto/update-incident.dto';
import { IncidentStatus } from '@prisma/client';

@Controller('incident')
export class IncidentController {
    constructor(private readonly incidentService: IncidentService) {}

    @Post('/task/:taskId')
    async create(
        @Body() createIncidentDto: CreateIncidentDto,
        @Param('taskId', ParseIntPipe) taskId: number,
    ) {
        return this.incidentService.create(createIncidentDto, taskId);
    }

    @Patch('/task/:id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateIncidentDto: Partial<UpdateIncidentDto>,
    ) {
        return this.incidentService.update(id, updateIncidentDto);
    }
    @Get()
    async findByFilters(
        @Query('name') name?: string,
        @Query('status') status?: IncidentStatus,
        @Query('startDate') startDate?: string,
        @Query('endDate') endDate?: string,
        @Query('sortOrder') sortOrder?: 'asc' | 'desc',
    ) {
        if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
            throw new BadRequestException(
                'La date de début doit être antérieure à la date de fin',
            );
        }

        if (sortOrder && !['asc', 'desc'].includes(sortOrder)) {
            throw new BadRequestException(
                `L'ordre de tri doit être asc ou desc`,
            );
        }

        const startDateTime = startDate ? new Date(startDate) : undefined;
        const endDateTime = endDate ? new Date(endDate) : undefined;

        return this.incidentService.findByFilters({
            name,
            status,
            startDate: startDateTime,
            endDate: endDateTime,
            sortOrder,
        });
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.incidentService.findOne(id);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        return this.incidentService.remove(id);
    }
}
