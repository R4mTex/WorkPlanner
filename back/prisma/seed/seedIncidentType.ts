import { IncidentType, PrismaClient, WorksiteType } from '@prisma/client';

const prisma = new PrismaClient();

const incidentTypeArray = [
  'Incidents liés à la sécurité',
  'Problèmes techniques et de qualité',
  'Problèmes avec les sous-traitants et les artisans',
  'Problèmes administratifs et juridiques',
  'Incidents environnementaux',
  'Incidents liés aux conditions météorologiques',
  'Problèmes financiers',
  "Problèmes liés à l'approvisionnement",
  'Problèmes de gestion de chantier',
  'Incidents divers',
];

export const createIncidentType = async (): Promise<IncidentType[]> => {
  const incidentTypes: IncidentType[] = [];

  for (let i = 0; i < incidentTypeArray.length; i++) {
    // Vérifier si le type existe déjà
    const existingType = await prisma.incidentType.findFirst({
      where: { name: incidentTypeArray[i] },
    });

    if (existingType) {
      // Si oui, ajoutez-le simplement au tableau
      incidentTypes.push(existingType);
    } else {
      // Sinon, créez-le
      const newType = await prisma.incidentType.create({
        data: { name: incidentTypeArray[i] },
      });
      incidentTypes.push(newType);
    }
  }
  return incidentTypes;
};
