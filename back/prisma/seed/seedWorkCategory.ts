import { PrismaClient, WorkCategory } from '@prisma/client';

const prisma = new PrismaClient();

export const createWorkCategory = async (): Promise<void> => {
  const categories = Object.values(WorkCategory);

  for (let i = 0; i < categories.length; i++) {
    const category = categories[i];
    await prisma.work.upsert({
      where: { id: i + 1 },
      update: {},
      create: {
        id: i + 1,
        category: category,
      },
    });
  }
};
