import { PrismaClient, UserHasNotification } from '@prisma/client';
import { fakerFR as faker } from '@faker-js/faker';

const prisma = new PrismaClient();

export const createUserHasNotification = async (): Promise<
  UserHasNotification[]
> => {
  const usersHasNotifications: UserHasNotification[] = [];
  const users = await prisma.user.findMany();
  const notifications = await prisma.notification.findMany();

  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const notification = faker.helpers.arrayElement(notifications);
    const userHasNotification = await prisma.userHasNotification.upsert({
      where: {
        userId_notificationId: {
          userId: user.id,
          notificationId: notification.id,
        },
      },
      update: {},
      create: {
        userId: user.id,
        notificationId: notification.id,
      },
    });
    usersHasNotifications.push(userHasNotification);
  }
  return usersHasNotifications;
};
