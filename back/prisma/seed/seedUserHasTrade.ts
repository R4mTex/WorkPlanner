import { PrismaClient, UserHasTrade } from '@prisma/client';
import { fakerFR as faker } from '@faker-js/faker';

const prisma = new PrismaClient();

export const createUserHasTrade = async (): Promise<UserHasTrade[]> => {
  const usersHasTrades: UserHasTrade[] = [];
  const users = await prisma.user.findMany();
  const trades = await prisma.trade.findMany();

  for (const user of users) {
    const randomTrades = faker.helpers.arrayElements(trades, 3);
    for (const trade of randomTrades) {
      const userHasTrades = await prisma.userHasTrade.upsert({
        where: {
          userId_tradeId: {
            userId: user.id,
            tradeId: trade.id,
          },
        },
        update: {},
        create: {
          userId: user.id,
          tradeId: trade.id,
        },
      });
      usersHasTrades.push(userHasTrades);
    }
  }
  return usersHasTrades;
};
