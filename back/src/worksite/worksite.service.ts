import Redis from 'ioredis';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Worksite } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateWorksiteDto } from './dto/create-worksite.dto';
import { UpdateWorksiteDto } from './dto/update-worksite.dto';
import { UploadService } from '../upload/upload.service';

@Injectable()
export class WorksiteService {
    private redisClient: Redis;
    constructor(
        private readonly prisma: PrismaService,
        private readonly uploadService: UploadService,
    ) {
        this.redisClient = new Redis('redis://localhost:6379');
    }

    async create(
        userId: number,
        createWorksiteDto: CreateWorksiteDto,
    ): Promise<Worksite> {
        try {
            const { worksiteTypes, ...worksiteData } = createWorksiteDto;

            const worksite = await this.prisma.worksite.create({
                data: worksiteData,
            });

            await this.prisma.worksiteHasWorksiteType.create({
                data: {
                    worksiteId: worksite.id,
                    worksiteTypeId: worksiteTypes[0].worksiteTypeId,
                },
            });

            await this.prisma.userHasWorksite.create({
                data: {
                    userId,
                    worksiteId: worksite.id,
                },
            });

            const fullWorksite = await this.prisma.worksite.findUnique({
                where: { id: worksite.id },
                include: {
                    worksiteTypes: {
                        include: {
                            worksiteType: true,
                        },
                    },
                },
            });

            return fullWorksite!;
        } catch (error) {
            //console.error('Error while creating worksite:', error);
            throw new Error('An error occurred while creating the worksite.');
        }
    }

    async findAll(
        userId: number,
        filters: {
            name?: string;
            city?: string;
            duration?: number;
            start?: string;
            end?: string;
            sortOrder?: 'asc' | 'desc';
        },
    ): Promise<Worksite[] | { message: string }> {
        const where: any = {
            userWorksites: {
                some: {
                    userId,
                },
            },
        };

        if (filters.start) {
            const startDate = new Date(filters.start);
            if (isNaN(startDate.getTime())) {
                return { message: 'Invalid start date' };
            }
            where.start = { gte: startDate };
        }

        if (filters.end) {
            const endDate = new Date(filters.end);
            if (isNaN(endDate.getTime())) {
                return { message: 'Invalid end date' };
            }
            where.end = { lte: endDate };
        }

        if (filters.name) {
            where.name = { contains: filters.name };
        }

        if (filters.city) {
            where.city = { contains: filters.city };
        }

        if (filters.duration !== undefined) {
            where.duration = filters.duration;
        }

        try {
            const worksites = await this.prisma.worksite.findMany({
                include: {
                    worksiteTypes: {
                        include: {
                            worksiteType: true,
                        },
                    },
                },
                where,
                orderBy: {
                    start: filters.sortOrder || 'asc',
                },
            });

            if (!worksites.length) {
                return {
                    message: 'No worksites found for this user.',
                };
            }

            return worksites;
        } catch (error) {
            throw new NotFoundException('Error while fetching worksites');
        }
    }

    async findOne(userId: number, id: number): Promise<Worksite | null> {
        return await this.prisma.worksite.findUnique({
            include: {
                worksiteTypes: {
                    include: {
                        worksiteType: true,
                    },
                },
            },
            where: {
                id,
                userWorksites: {
                    some: { userId },
                },
            },
        });
    }

    async update(
        id: number,
        updateWorksiteDto: UpdateWorksiteDto,
    ): Promise<Worksite> {
        try {
            const { worksiteTypes, ...worksiteData } = updateWorksiteDto;

            const updatedWorksite = await this.prisma.worksite.update({
                where: { id },
                data: worksiteData,
            });

            if (worksiteTypes) {
                await this.prisma.worksiteHasWorksiteType.updateMany({
                    where: { worksiteId: id },
                    data: {
                        worksiteTypeId: worksiteTypes[0].worksiteTypeId,
                    },
                });
            }

            return updatedWorksite;
        } catch (error) {
            throw new NotFoundException(`Worksite with id ${id} not found`);
        }
    }

    async remove(id: number): Promise<Worksite> {
        const worksite = await this.prisma.worksite.findUnique({
            where: { id },
        });

        if (worksite?.picture) {
            const fileName = worksite.picture.split('/').pop();
            if (fileName) {
                await this.uploadService.deleteImage(fileName);
            }
        }

        return this.prisma.worksite.delete({
            where: { id },
        });
    }
}
