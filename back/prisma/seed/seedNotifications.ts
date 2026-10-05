import { PrismaClient, Notification, NotificationTag } from '@prisma/client';
import { fakerFR as faker } from '@faker-js/faker';

const prisma = new PrismaClient();

export const createNotification = async (
    number: number,
): Promise<Notification[]> => {
    const notifications: Notification[] = [];
    const notificationTags = Object.values(NotificationTag);

    const worksites = await prisma.worksite.findMany({ select: { id: true } });
    const worksiteIds = worksites.map((worksite) => worksite.id);

    for (let i = 0; i < number; i++) {
        const tag = faker.helpers.arrayElement(notificationTags);
        const randomWorksiteId = faker.helpers.arrayElement(worksiteIds);
        const notification = await prisma.notification.upsert({
            where: { id: i + 1 },
            update: {},
            create: {
                tag: tag,
                description: faker.lorem.sentence(),
                author: faker.person.fullName(),
                worksiteId: randomWorksiteId,
            },
        });
        notifications.push(notification);
    }
    return notifications;
};
