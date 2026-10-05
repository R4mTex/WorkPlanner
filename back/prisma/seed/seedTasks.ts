import { PrismaClient, Task, TaskStatus } from '@prisma/client';
import { fakerFR as faker } from '@faker-js/faker';

const prisma = new PrismaClient();

export const createTask = async (): Promise<Task[]> => {
    const tasks: Task[] = [];
    const status = Object.values(TaskStatus);

    for (let i = 0; i < 10; i++) {
        const task = await prisma.task.upsert({
            where: { id: i + 1 },
            update: {},
            create: {
                name: `Task ${i + 1}`,
                description: faker.lorem.sentence(),
                start: faker.date.future(),
                end: faker.date.future(),
                //duration: faker.number.int({ min: 1, max: 8 }),
                status: faker.helpers.arrayElement(status),
                worksiteId: faker.number.int({ min: 1, max: 10 }),
            },
        });
        tasks.push(task);
    }
    return tasks;
};
