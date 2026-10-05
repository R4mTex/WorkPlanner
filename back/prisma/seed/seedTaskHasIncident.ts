import { PrismaClient, Task, Incident } from '@prisma/client';
import { fakerFR as faker } from '@faker-js/faker';

const prisma = new PrismaClient();

export const createTaskHasIncident = async (
  tasks: Task[],
  incidents: Incident[],
): Promise<void> => {
  // Make sure we have tasks and incidents
  if (tasks.length === 0 || incidents.length === 0) {
    console.log('No tasks or incidents found to create relationships');
    return;
  }

  /* console.log('Creating task-incident relationships...'); */

  // Create between 10-15 task-incident relationships
  const relationshipsCount = faker.number.int({ min: 10, max: 15 });

  // Keep track of created pairs to avoid duplicates
  const createdPairs = new Set<string>();

  for (let i = 0; i < relationshipsCount; i++) {
    // Randomly select a task and an incident
    const randomTask = faker.helpers.arrayElement(tasks);
    const randomIncident = faker.helpers.arrayElement(incidents);

    // Create a unique pair identifier
    const pairKey = `${randomTask.id}-${randomIncident.id}`;

    // Skip if this pair already exists
    if (createdPairs.has(pairKey)) {
      continue;
    }

    createdPairs.add(pairKey);

    try {
      // Create the relationship
      await prisma.taskHasIncident.create({
        data: {
          taskId: randomTask.id,
          incidentId: randomIncident.id,
        },
      });
      // console.log(
      //   `Created relationship: Task ${randomTask.id} - Incident ${randomIncident.id}`,
      // );
    } catch (error) {
      console.error(`Error creating task-incident relationship: ${error}`);
    }
  }

  // console.log(`Created ${createdPairs.size} task-incident relationships`);
};
