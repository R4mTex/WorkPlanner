import { PrismaClient, Invoice } from '@prisma/client';
import { fakerFR as faker } from '@faker-js/faker';

const prisma = new PrismaClient();

export const createInvoice = async (): Promise<Invoice[]> => {
  const invoices: Invoice[] = [];
  const purchases = await prisma.purchase.findMany({ select: { id: true } });

  for (let i = 0; i < 5; i++) {
    const purchaseId = faker.helpers.arrayElement(purchases)?.id || 1;
    const invoice = await prisma.invoice.upsert({
      where: { signedDocument: faker.string.uuid() },
      update: {},
      create: {
        signedDocument: faker.string.uuid(),
        purchases: {
          create: { purchaseId },
        },
      },
    });
    invoices.push(invoice);
  }
  return invoices;
};
