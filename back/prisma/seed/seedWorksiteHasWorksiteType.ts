import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createWorksiteHasWorksiteType = async () => {
  const worksites = await prisma.worksite.findMany();
  const worksiteTypes = await prisma.worksiteType.findMany();

  for (const worksite of worksites) {
    for (const type of worksiteTypes) {
      await prisma.worksiteHasWorksiteType.upsert({
        where: {
          worksiteId_worksiteTypeId: {
            worksiteId: worksite.id,
            worksiteTypeId: type.id,
          },
        },
        update: {},
        create: {
          worksiteId: worksite.id,
          worksiteTypeId: type.id,
        },
      });
    }
  }
};
