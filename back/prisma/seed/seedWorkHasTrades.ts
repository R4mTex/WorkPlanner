import { PrismaClient, WorkHasTrade, WorkCategory } from '@prisma/client';

const prisma = new PrismaClient();

const tradesByWorks: Record<WorkCategory, string[]> = {
  StructuralWork: [
    'Mason',
    'Excavator/Earthworker',
    'Concrete worker',
    'Steel fixer',
    'Carpenter',
    'Roofer',
    'Waterproofer',
  ],
  SecondaryWork: [
    'Plasterer',
    'Insulation installer',
    'Partition installer',
    'Ceiling installer',
    'Ventilation installer',
    'Heating technician',
    'Air conditioning technician',
    'Fire safety technician',
    'Low-voltage electrician',
    'Data cabling technician',
    'Sanitary installer',
    'Interior joiner',
  ],
  FinishingWork: [
    'Plumber',
    'Electrician',
    'Drywall installer',
    'Joiner/Woodworker',
    'Tile setter',
    'Painter',
    'Flooring installer',
    'Heating engineer',
    'Locksmith',
    'Glazier',
    'Façade specialist',
  ],
  Specialized: [
    'Architect',
    'Surveyor',
    'Construction manager',
    'Site supervisor',
    'Building inspector',
    'HVAC installer',
    'Ironworker',
    'Ornamental plasterer',
    'Acoustician',
    'Elevator technician',
    'Marble worker',
  ],
};

export const createWorkHasTrade = async (): Promise<WorkHasTrade[]> => {
  const worksHasTrades: WorkHasTrade[] = [];

  const trades = await prisma.trade.findMany();
  const tradesByName = Object.fromEntries(
    trades.map((trade) => [trade.name, trade]),
  );

  const works = await prisma.work.findMany();

  for (const work of works) {
    const tradeNames = tradesByWorks[work.category as WorkCategory] || [];

    for (const tradeName of tradeNames) {
      const trade = tradesByName[tradeName];
      if (!trade) continue;

      const workHasTrade = await prisma.workHasTrade.upsert({
        where: { workId_tradeId: { workId: work.id, tradeId: trade.id } },
        update: {},
        create: {
          workId: work.id,
          tradeId: trade.id,
        },
      });

      worksHasTrades.push(workHasTrade);
    }
  }

  return worksHasTrades;
};
