import { CreateNotificationDto } from '../dto/create-notification.dto';
import { NotificationTag } from '@prisma/client';

export class Notification {
    static countNotification = 0;

    constructor(createNotificationDto: CreateNotificationDto) {
        Notification.countNotification++;
        this.id = Notification.countNotification;
        this.tag = createNotificationDto.tag;
        this.description = createNotificationDto.description;
        this.author = createNotificationDto.author;
        this.read = createNotificationDto.read;
        this.worksiteId = createNotificationDto.worksiteId;
        this.createdAt = new Date(createNotificationDto.createdAt);
        this.updatedAt = new Date(createNotificationDto.updatedAt);
    }

    id: number;

    tag: NotificationTag;

    description: string;

    author: string;

    read: boolean;

    worksiteId: number;

    createdAt: Date;

    updatedAt: Date;
}
