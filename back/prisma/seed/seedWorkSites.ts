import { PrismaClient, Worksite } from '@prisma/client';
import { fakerFR as faker } from '@faker-js/faker';
import { addDays } from 'date-fns';

const prisma = new PrismaClient();

export const createWorksite = async (number: number): Promise<Worksite[]> => {
    const worksites: Worksite[] = [];
    const worksiteTypes = await prisma.worksiteType.findMany();

    for (let i = 0; i < number; i++) {
        const startDate = faker.date.future();
        const duration = faker.number.int({ min: 1, max: 30 });
        const endDate = addDays(startDate, duration);

        const worksite = await prisma.worksite.upsert({
            where: { picture: faker.image.url() },
            update: {},
            create: {
                name: faker.commerce.productName(),
                description: faker.lorem.sentence(),
                start: startDate,
                end: endDate,
                duration,
                formattedDuration: 'test',
                picture: faker.image.url(),
                streetName: faker.location.street(),
                postalCode: faker.location.zipCode(),
                city: faker.location.city(),
                country: faker.location.country(),
                worksiteTypes: {
                    create: worksiteTypes.map((type) => ({
                        worksiteTypeId: type.id,
                    })),
                },
            },
        });

        worksites.push(worksite);
    }

    return worksites;
};
