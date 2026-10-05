import { PrismaClient, Purchase } from '@prisma/client';
import { fakerFR as faker } from '@faker-js/faker';

const prisma = new PrismaClient();

export const createPurchase = async (): Promise<Purchase[]> => {
  const purchases: Purchase[] = [];
  const worksiteIds = await prisma.worksite.findMany({ select: { id: true } });

  for (let i = 0; i < 5; i++) {
    const worksiteId = faker.helpers.arrayElement(worksiteIds)?.id || 1;
    const purchase = await prisma.purchase.upsert({
      where: { id: i + 1 },
      update: {},
      create: {
        name: `Purchase ${i + 1}`,
        description: faker.lorem.sentence(),
        price: faker.number.int({ min: 100, max: 1000 }),
        worksiteId,
      },
    });
    purchases.push(purchase);
  }
  return purchases;
};
