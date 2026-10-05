import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';

import { Prisma, Task, TaskStatus } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

import { Filters } from 'src/interface';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

interface TaskFilters extends Filters {
    status?: TaskStatus;
    date?: string;
}

const taskWithRelations = Prisma.validator<Prisma.TaskDefaultArgs>()({
    include: {
        incidents: {
            include: {
                incident: true,
            },
        },
    },
});

type TaskWithRelations = Prisma.TaskGetPayload<typeof taskWithRelations>;

@Injectable()
export class TaskService {
    constructor(private readonly prisma: PrismaService) {}

    async create(createTaskDto: CreateTaskDto): Promise<Task> {
        return await this.prisma.task.create({
            data: createTaskDto,
        });
    }

    async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
        return this.prisma.task.update({
            where: {
                id,
            },
            data: updateTaskDto,
        });
    }

    async remove(id: number): Promise<Task> {
        return this.prisma.task.delete({
            where: {
                id,
            },
        });
    }

    async findOne(
        id: number,
        userId: number,
    ): Promise<TaskWithRelations | null> {
        // Vérifie si l'utilisateur est lié au worksite
        const worksite = await this.prisma.worksite.findFirst({
            where: {
                id,
                userWorksites: {
                    some: { userId },
                },
            },
        });

        if (!worksite) {
            throw new NotFoundException(
                'Worksite not found or user not authorized',
            );
        }
        return await this.prisma.task.findUnique({
            include: {
                incidents: {
                    include: {
                        incident: {
                            include: {
                                incidentTypes: {
                                    include: {
                                        incidentType: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
            where: {
                id,
            },
        });
    }
    async findAllStartDates(id: number, userId: number): Promise<Date[]> {
        const uniqueDates = await this.prisma.task.findMany({
            select: {
                start: true,
            },
            where: {
                worksiteId: id,
                worksite: {
                    userWorksites: {
                        some: {
                            userId,
                        },
                    },
                },
            },
            distinct: 'start',
            orderBy: {
                start: 'asc',
            },
        });

        return uniqueDates.map((item) => item.start);
    }

    async findByFilters(
        id: number,
        date: string,
        userId: number,
        filters: TaskFilters,
    ): Promise<Task[] | { message: string }> {
        const where: any = {};
        const orderBy: any = {};
        orderBy.start = orderBy.start || 'asc';

        where.worksiteId = id;
        where.worksite = {
            userWorksites: {
                some: {
                    userId,
                },
            },
        };

        const startOfDay = new Date(date);
        if (isNaN(startOfDay.getTime())) {
            return { message: 'Invalid date format' };
        }
        const endOfDay = new Date(startOfDay);
        endOfDay.setHours(23, 59, 59, 999);

        where.start = {
            gte: startOfDay,
            lte: endOfDay,
        };

        for (const [key, value] of Object.entries(filters)) {
            switch (key) {
                case 'name':
                    if (value) {
                        where.name = {
                            contains: value,
                        };
                    }
                    break;
                case 'status':
                    if (value) {
                        where.status = value;
                    }
                    break;
                case 'duration':
                    if (value !== undefined) {
                        where.duration = value;
                    }
                    break;
                case 'sortOrder':
                    if (value) {
                        orderBy.start = value;
                    }
                    break;
            }
        }

        const tasks = await this.prisma.task.findMany({
            include: {
                incidents: {
                    include: {
                        incident: {
                            include: {
                                incidentTypes: {
                                    include: {
                                        incidentType: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },

            where,
            orderBy,
        });

        //console.log('👉 tasks:', tasks);
        return tasks;
    }
}
