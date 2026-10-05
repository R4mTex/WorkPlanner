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
    Req,
    BadRequestException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from '@prisma/client';
import { TaskService } from './task.service';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Post()
    create(@Body() createTaskDto: CreateTaskDto) {
        return this.taskService.create(createTaskDto);
    }

    @Get('/:id')
    async findByStartDate(@Req() req, @Param('id', ParseIntPipe) id: number) {
        const userId = req.user.sub;
        return this.taskService.findAllStartDates(id, userId);
    }

    @Get('/detail/:id')
    findOne(@Req() req, @Param('id', ParseIntPipe) id: number) {
        const userId = req.user.sub;
        return this.taskService.findOne(id, userId);
    }

    @Get('/:id/:date')
    async findByFilters(
        @Req() req,
        @Param('id', ParseIntPipe) id: number,
        @Param('date') date: string,
        @Query('name') name?: string,
        @Query('status') status?: TaskStatus,
        @Query('duration') duration?: string,
        @Query('sortOrder') sortOrder?: 'asc' | 'desc',
    ) {
        if (sortOrder && !['asc', 'desc'].includes(sortOrder)) {
            throw new BadRequestException(
                `L'ordre de tri doit être asc ou desc`,
            );
        }
        const userId = req.user.sub;
        const durationNumber = duration ? parseInt(duration, 10) : undefined;

        return this.taskService.findByFilters(id, date, userId, {
            name,
            status,
            duration: durationNumber,
            sortOrder,
        });
    }

    @Patch('/:id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateTaskDto: UpdateTaskDto,
    ) {
        return this.taskService.update(id, updateTaskDto);
    }

    @Delete('/:id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.taskService.remove(id);
    }
}
