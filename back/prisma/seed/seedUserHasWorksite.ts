import { PrismaClient, UserHasWorksite } from '@prisma/client';
import { fakerFR as faker } from '@faker-js/faker';

const prisma = new PrismaClient();

export const createUserHasWorksite = async (): Promise<UserHasWorksite[]> => {
  const usersHasWorksites: UserHasWorksite[] = [];
  const users = await prisma.user.findMany();
  const worksites = await prisma.worksite.findMany();

  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const worksite = faker.helpers.arrayElement(worksites);
    const userHasWorksite = await prisma.userHasWorksite.upsert({
      where: {
        userId_worksiteId: {
          userId: user.id,
          worksiteId: worksite.id,
        },
      },
      update: {},
      create: {
        userId: user.id,
        worksiteId: worksite.id,
      },
    });
    usersHasWorksites.push(userHasWorksite);
  }
  return usersHasWorksites;
};
