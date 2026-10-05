import { PrismaClient, User, Role } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

export async function hashPassword(password: string): Promise<string> {
  try {
    return await argon2.hash(password);
  } catch (error) {
    console.error('Erreur lors du hachage du mot de passe:', error);
    throw new Error('Échec du hachage du mot de passe');
  }
}

export const createUser = async (number: number): Promise<User[]> => {
  const users: User[] = [];
  const roles = Object.values(Role);
  const worksites = await prisma.worksite.findMany();
  const notifications = await prisma.notification.findMany();
  const tasks = await prisma.task.findMany();
  const trades = await prisma.trade.findMany();

  for (let i = 0; i < number; i++) {
    const role = faker.helpers.arrayElement(roles);
    const worksite = faker.helpers.arrayElement(worksites);
    const notification = faker.helpers.arrayElement(notifications);
    const task = faker.helpers.arrayElement(tasks);
    const trade = faker.helpers.arrayElement(trades);
    const email = faker.internet.email();
    const plainPassword = "Azerty&1!!";

    try {
      const hashedPassword = await hashPassword(plainPassword);

      const user = await prisma.user.upsert({
        where: { email },
        update: {},
        create: {
          email,
          password: hashedPassword,
          role,
          userWorksites: {
            create: { worksiteId: worksite.id },
          },
          userNotifications: {
            create: { notificationId: notification.id },
          },
          userTasks: {
            create: { taskId: task.id },
          },
          userHasTrade: {
            create: { tradeId: trade.id },
          },
        },
      });

      users.push(user);

      if (user.role === 'Individual') {
        await prisma.userParams.upsert({
          where: { userId: user.id },
          update: {},
          create: {
            lastname: faker.person.lastName(),
            firstname: faker.person.firstName(),
            phoneNumber: faker.phone.number(),
            streetName: faker.location.street(),
            postalCode: faker.location.zipCode(),
            city: faker.location.city(),
            country: faker.location.country(),
            userId: user.id,
          },
        });
      } else {
        await prisma.professional.upsert({
          where: { userId: user.id },
          update: {},
          create: {
            phoneNumber: faker.phone.number(),
            name: faker.person.firstName(),
            managerName: faker.person.firstName(),
            legalStatus: faker.string.alphanumeric(13),
            workforce: faker.number.int({ min: 1, max: 10 }),
            streetName: faker.location.street(),
            postalCode: faker.location.zipCode(),
            city: faker.location.city(),
            country: faker.location.country(),
            userId: user.id,
          },
        });
      }
    } catch (error) {
      console.error(
        `Erreur lors de la création de l'utilisateur ${email}:`,
        error,
      );
    }
  }

  return users;
};
