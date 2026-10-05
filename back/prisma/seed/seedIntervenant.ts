import { PrismaClient, Intervenant, IntervenantStatus } from '@prisma/client';
import { fakerFR as faker } from '@faker-js/faker';

const prisma = new PrismaClient();

export const createIntervenant = async (): Promise<Intervenant[]> => {
    const intervenants: Intervenant[] = [];
    const tasks = await prisma.task.findMany();
    const status = Object.values(IntervenantStatus);

    for (let i = 0; i < 10; i++) {
        const randomTasks = faker.helpers
            .arrayElements(tasks, faker.number.int({ min: 2, max: 4 }))
            .map((task) => ({ taskId: task.id }));

        const intervenant = await prisma.intervenant.upsert({
            where: { id: i + 1 },
            update: {},
            create: {
                lastname: faker.person.lastName(),
                firstname: faker.person.firstName(),
                phoneNumber: faker.phone.number(),
                email: faker.internet.email(),
                status: faker.helpers.arrayElement(status),
                tasks: {
                    create: randomTasks,
                },
            },
        });

        intervenants.push(intervenant);
    }

    return intervenants;
};
