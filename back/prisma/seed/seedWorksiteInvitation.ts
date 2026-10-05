import { PrismaClient, WorksiteInvitation } from '@prisma/client';
import { fakerFR as faker } from '@faker-js/faker';

const prisma = new PrismaClient();

export const createWorksiteInvitations = async (
  number: number,
): Promise<WorksiteInvitation[]> => {
  const invitations: WorksiteInvitation[] = [];
  const worksites = await prisma.worksite.findMany();

  for (let i = 0; i < number; i++) {
    const worksite = faker.helpers.arrayElement(worksites);
    const email = faker.internet.email();

    const invitation = await prisma.worksiteInvitation.upsert({
      where: {
        email_worksiteId_unique: {
          email: email,
          worksiteId: worksite.id,
        },
      },
      update: {},
      create: {
        email: email,
        worksiteId: worksite.id,
      },
    });
    invitations.push(invitation);
  }
  return invitations;
};
