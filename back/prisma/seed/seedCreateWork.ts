import { PrismaClient, Work, WorkCategory } from '@prisma/client';

const prisma = new PrismaClient();

export const createWork = async (): Promise<Work[]> => {
  const works: Work[] = [];
  const categories = Object.values(WorkCategory);

  for (let i = 0; i < categories.length; i++) {
    const category = categories[i];
    const work = await prisma.work.upsert({
      where: { id: i + 1 },
      update: {},
      create: {
        id: i + 1,
        category: category,
      },
    });
    works.push(work);
  }
  return works;
};
