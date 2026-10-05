import {
    PrismaClient,
    Incident,
    IncidentStatus,
    IncidentType,
} from '@prisma/client';
import { fakerFR as faker } from '@faker-js/faker';

const prisma = new PrismaClient();

export const createIncident = async (): Promise<Incident[]> => {
    const incidents: Incident[] = [];
    const incidentStatus = Object.values(IncidentStatus);

    // Récupère les types d'incident existants
    const incidentTypes = await prisma.incidentType.findMany();
    if (incidentTypes.length === 0) {
        throw new Error(
            "Aucun incidentType trouvé en base. Ajoutez-les d'abord.",
        );
    }
    const randomType =
        incidentTypes[Math.floor(Math.random() * incidentTypes.length)];
    for (let i = 0; i < 5; i++) {
        const incident = await prisma.incident.upsert({
            where: { id: i + 1 },
            update: {},
            create: {
                name: `Incident ${i + 1}`,
                description: faker.lorem.sentence(),
                status: faker.helpers.arrayElement(incidentStatus),
                start: faker.date.future(),
                end: faker.date.future(),
                incidentTypeId: randomType.id,
            },
        });

        // Créer la relation avec un type d'incident
        await prisma.incidentHasIncidentType.upsert({
            where: {
                incidentId_incidentTypeId: {
                    incidentId: incident.id,
                    incidentTypeId: randomType.id,
                },
            },
            update: {},
            create: {
                incidentId: incident.id,
                incidentTypeId: randomType.id,
            },
        });

        incidents.push(incident);
    }
    return incidents;
};
