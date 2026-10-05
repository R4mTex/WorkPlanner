import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createTaskCategoryHasTaskType = async () => {
  const taskCategories = await prisma.taskCategory.findMany();
  const taskTypes = await prisma.taskType.findMany();

  for (const category of taskCategories) {
    for (const type of taskTypes) {
      await prisma.taskCategoryHasTaskType.upsert({
        where: {
          taskCategoryId_taskTypeId: {
            taskCategoryId: category.id,
            taskTypeId: type.id,
          },
        },
        update: {},
        create: {
          taskCategoryId: category.id,
          taskTypeId: type.id,
        },
      });
    }
  }
};
