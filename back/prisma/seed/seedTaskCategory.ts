import { PrismaClient, TaskCategoryEnum } from '@prisma/client';

const prisma = new PrismaClient();

const categories = Object.values(TaskCategoryEnum);

export const createTaskCategory = async (): Promise<TaskCategoryEnum[]> => {
  const createdCategories: TaskCategoryEnum[] = [];

  for (const category of categories) {
    const existing = await prisma.taskCategory.findFirst({
      where: { category },
    });

    if (!existing) {
      await prisma.taskCategory.create({
        data: { category },
      });
      createdCategories.push(category);
    }
  }

  return createdCategories;
};
