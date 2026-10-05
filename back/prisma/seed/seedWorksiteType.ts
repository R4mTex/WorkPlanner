import { PrismaClient, WorksiteType } from '@prisma/client';

const prisma = new PrismaClient();

export const createWorksiteType = async (): Promise<WorksiteType[]> => {
  const worksiteTypes: WorksiteType[] = [];
  const workSiteArray = [
    'Nouvelle construction (maison individuelle)',
    'Rénovation complète de maison',
    'Rénovation partielle (cuisine, salle de bain)',
    'Extension de maison',
    "Ajout d'un étage supplémentaire",
    'Aménagement des combles',
    'Finition du sous-sol',
    "Travaux d'isolation thermique",
    'Rénovation de façade',
    'Réparation de toiture',
    'Création de nouvelles ouvertures (fenêtres, portes)',
    'Aménagement paysager/travaux de jardin',
    'Construction de piscine',
    'Construction de dépendance (garage, abri de jardin, pool house)',
    "Installation d'équipements spécifiques (panneaux solaires, pompe à chaleur)",
    'Mise aux normes des systèmes (électricité, plomberie, accessibilité)',
    "Petits travaux d'entretien ou de réparation",
    'test',
  ];

  for (let i = 0; i < workSiteArray.length; i++) {
    // D'abord, vérifiez si le type existe déjà
    const existingType = await prisma.worksiteType.findFirst({
      where: { name: workSiteArray[i] },
    });

    if (existingType) {
      // Si oui, ajoutez-le simplement au tableau
      worksiteTypes.push(existingType);
    } else {
      // Sinon, créez-le
      const newType = await prisma.worksiteType.create({
        data: { name: workSiteArray[i] },
      });
      worksiteTypes.push(newType);
    }
  }
  return worksiteTypes;
};
