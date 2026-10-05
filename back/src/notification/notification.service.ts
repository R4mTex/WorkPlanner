import { Injectable } from '@nestjs/common';

import { Notification } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

import { broadcastNotificationToWorksiteUsers } from 'src/websocket/websocket.gateway';

@Injectable()
export class NotificationService {
    constructor(private readonly prisma: PrismaService) {}

    async create(
        createNotificationDto: CreateNotificationDto,
    ): Promise<Notification> {
        const notification = await this.prisma.notification.create({
            data: createNotificationDto,
        });

        await broadcastNotificationToWorksiteUsers({
            tag: notification.tag,
            worksiteId: createNotificationDto.worksiteId,
            data: notification,
            timestamp: Date.now(),
        });

        return notification;
    }

    async findAll(): Promise<Notification[]> {
        return this.prisma.notification.findMany({
            orderBy: {
                createdAt: 'asc',
            },
        });
    }

    async findOne(id: number): Promise<Notification | null> {
        return this.prisma.notification.findUnique({
            where: { id },
        });
    }

    async update(
        id: number,
        updateNotificationDto: Partial<UpdateNotificationDto>,
    ): Promise<Notification> {
        return this.prisma.notification.update({
            where: { id },
            data: updateNotificationDto,
        });
    }

    async remove(id: number): Promise<Notification> {
        return this.prisma.notification.delete({
            where: { id },
        });
    }
}
