import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createIncidentHasIncidentType = async () => {
  const incidents = await prisma.incident.findMany();
  const incidentTypes = await prisma.incidentType.findMany();

  for (const incident of incidents) {
    for (const type of incidentTypes) {
      await prisma.incidentHasIncidentType.upsert({
        where: {
          incidentId_incidentTypeId: {
            incidentId: incident.id,
            incidentTypeId: type.id,
          },
        },
        update: {},
        create: {
          incidentId: incident.id,
          incidentTypeId: type.id,
        },
      });
    }
  }
};
