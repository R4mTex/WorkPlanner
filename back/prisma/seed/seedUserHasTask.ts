import { PrismaClient, UserHasTask } from '@prisma/client';
import { fakerFR as faker } from '@faker-js/faker';

const prisma = new PrismaClient();

export const createUserHasTask = async (): Promise<UserHasTask[]> => {
  const usersHasTasks: UserHasTask[] = [];
  const users = await prisma.user.findMany();
  const tasks = await prisma.task.findMany();

  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const task = faker.helpers.arrayElement(tasks);
    const userHasTask = await prisma.userHasTask.upsert({
      where: {
        userId_taskId: {
          userId: user.id,
          taskId: task.id,
        },
      },
      update: {},
      create: {
        userId: user.id,
        taskId: task.id,
      },
    });
    usersHasTasks.push(userHasTask);
  }
  return usersHasTasks;
};
