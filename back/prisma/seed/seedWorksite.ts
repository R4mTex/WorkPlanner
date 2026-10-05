import {
    PrismaClient,
    TaskCategoryEnum,
    TaskStatus,
    IncidentStatus,
    NotificationTag,
    Worksite,
    WorksiteType,
} from '@prisma/client';
import { fakerFR as faker } from '@faker-js/faker';

const prisma = new PrismaClient();

export async function test() {
    const worksiteTypes = await prisma.worksiteType.findMany();
    const taskTypes = await prisma.taskType.findMany();
    const incidentTypes = await prisma.incidentType.findMany();
    const taskCategories = await prisma.taskCategory.findMany();

    if (taskCategories.length === 0) {
        await createTaskCategories();
    }

    const worksites = await createWorksites(5, worksiteTypes);

    for (const worksite of worksites) {
        await createTasksForWorksite(worksite.id, 5);
        await createIncidentsForWorksite(worksite.id, 5);
        await createPurchasesForWorksite(worksite.id, 5);
    }

    console.log('Seed complété avec succès!');
}

async function createTaskCategories() {
    const categories = Object.values(TaskCategoryEnum);

    for (const category of categories) {
        await prisma.taskCategory.create({
            data: {
                category,
            },
        });
    }

    console.log(`${categories.length} catégories de tâches créées`);
}

async function createWorksites(
    count: number,
    worksiteTypes: WorksiteType[],
): Promise<Worksite[]> {
    const worksites: Worksite[] = [];

    for (let i = 0; i < count; i++) {
        const startDate = faker.date.future();
        const endDate = new Date(startDate);
        endDate.setMonth(
            endDate.getMonth() + faker.number.int({ min: 1, max: 12 }),
        );

        const duration = faker.number.int({ min: 30, max: 365 });
        const formattedDuration = `${duration} jours`;

        const worksite = await prisma.worksite.create({
            data: {
                name: `Chantier ${faker.company.name()}`,
                description: faker.lorem.paragraph({ min: 25, max: 155 }),
                start: startDate,
                end: endDate,
                duration: duration,
                formattedDuration: formattedDuration,
                picture: faker.image.url(),
                streetNumber: faker.location.buildingNumber(),
                streetName: faker.location.street(),
                postalCode: faker.location.zipCode(),
                city: faker.location.city(),
                country: 'France',

                worksiteTypes: {
                    create: Array.from(
                        { length: faker.number.int({ min: 1, max: 3 }) },
                        () => {
                            const randomType =
                                worksiteTypes[
                                    Math.floor(
                                        Math.random() * worksiteTypes.length,
                                    )
                                ];
                            return {
                                worksiteType: {
                                    connect: { id: randomType.id },
                                },
                            };
                        },
                    ),
                },
            },
        });

        worksites.push(worksite);
        console.log(`Worksite créé: ${worksite.name}`);
    }

    return worksites;
}

async function createTasksForWorksite(worksiteId: number, count: number) {
    const taskCategories = await prisma.taskCategory.findMany();

    for (let i = 0; i < count; i++) {
        const startDate = faker.date.future();
        const endDate = new Date(startDate);
        endDate.setDate(
            endDate.getDate() + faker.number.int({ min: 1, max: 30 }),
        );

        const randomCategory =
            taskCategories[Math.floor(Math.random() * taskCategories.length)];

        const task = await prisma.task.create({
            data: {
                name: `Tâche ${i + 1}: ${faker.commerce.productName()}`,
                description: faker.lorem.paragraph({ min: 25, max: 155 }),
                start: startDate,
                end: endDate,
                duration: faker.number.int({ min: 1, max: 30 }),
                status: faker.helpers.arrayElement(Object.values(TaskStatus)),
                worksiteId: worksiteId,
                categories: {
                    connect: { id: randomCategory.id },
                },
            },
        });

        console.log(`Tâche créée: ${task.name} pour le worksite ${worksiteId}`);
    }
}

async function createIncidentsForWorksite(worksiteId: number, count: number) {
    const tasks = await prisma.task.findMany({
        where: { worksiteId },
    });

    const incidentTypes = await prisma.incidentType.findMany();

    for (let i = 0; i < count; i++) {
        if (tasks.length === 0) continue; // Si pas de tâches, on saute

        const randomType =
            incidentTypes[Math.floor(Math.random() * incidentTypes.length)];
        // Créer l'incident
        const incident = await prisma.incident.create({
            data: {
                name: `Incident ${i + 1}: ${faker.lorem.words(3)}`,
                description: faker.lorem.paragraph({ min: 25, max: 155 }),
                duration: faker.number.int({ min: 1, max: 14 }),
                status: faker.helpers.arrayElement(
                    Object.values(IncidentStatus),
                ),
                incidentTypeId: randomType.id,
            },
        });

        const randomTask = tasks[Math.floor(Math.random() * tasks.length)];
        await prisma.taskHasIncident.create({
            data: {
                taskId: randomTask.id,
                incidentId: incident.id,
            },
        });

        await prisma.notification.create({
            data: {
                tag: NotificationTag.Incident,
                description: `Nouvel incident signalé: ${incident.name}`,
                read: faker.datatype.boolean(),
            },
        });

        console.log(
            `Incident créé: ${incident.name} lié à la tâche ${randomTask.id}`,
        );
    }
}

async function createPurchasesForWorksite(worksiteId: number, count: number) {
    for (let i = 0; i < count; i++) {
        const purchase = await prisma.purchase.create({
            data: {
                name: `Achat ${i + 1}: ${faker.commerce.productName()}`,
                description: faker.lorem.sentence(),
                price: parseFloat(
                    faker.commerce.price({ min: 100, max: 10000 }),
                ),
                deadlines: faker.number.int({ min: 1, max: 30 }),
                worksiteId: worksiteId,
            },
        });

        if (faker.datatype.boolean(0.7)) {
            const invoice = await prisma.invoice.create({
                data: {
                    signedDocument: faker.system.filePath(),
                },
            });

            await prisma.purchaseHasInvoice.create({
                data: {
                    purchaseId: purchase.id,
                    invoiceId: invoice.id,
                },
            });

            console.log(
                `Achat créé: ${purchase.name} avec facture ${invoice.id}`,
            );
        } else {
            console.log(`Achat créé: ${purchase.name} sans facture`);
        }
    }
}

test()
    .then(async () => {
        console.log('Seeding terminé avec succès');
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error('Erreur lors du seeding:', e);
        await prisma.$disconnect();
        process.exit(1);
    });
