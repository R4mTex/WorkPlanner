import { PrismaClient, TaskType } from '@prisma/client';

const prisma = new PrismaClient();

export const createTaskType = async (): Promise<TaskType[]> => {
  const taskTypeArray = [
    // Pour les nouvelles constructions
    'Études de sol et implantation',
    'Excavation et fondations',
    'Construction des murs',
    'Charpente et toiture',
    'Installation des fenêtres et portes',
    "Travaux de plomberie et d'électricité",
    'Isolation et cloisonnement',
    'Revêtements de sols et murs',
    'Aménagement extérieur',

    // Pour les rénovations
    'Évaluation de la structure existante',
    'Démolition sélective',
    'Renforcement structurel si nécessaire',
    'Mise aux normes des systèmes',
    'Nouvelles dispositions',
    'Travaux de finition',

    // Pour les extensions
    'Raccordement à la structure existante',
    "Création d'ouvertures entre les anciennes et nouvelles sections",
    'Harmonisation des styles et matériaux',

    // Pour les travaux spécifiques
    'Isolation : retrait des anciens matériaux, installation des nouveaux',
    'Toiture : échafaudage, dépose, révision de charpente, nouvelle couverture',
    'Façade : échafaudage, préparation des surfaces, application des revêtements',
    'Aménagement extérieur : terrassement, réseaux, revêtement, plantation',

    // Tâches administratives associées
    'Demande de permis de construire ou déclaration préalable',
    "Déclaration d'ouverture de chantier",
    'Coordination des corps de métier',
    'Suivi du planning',
    'Contrôle qualité',
    'Inspection finale et réception des travaux',
  ];

  const taskTypes: TaskType[] = [];

  for (let i = 0; i < taskTypeArray.length; i++) {
    // Vérifier si le type existe déjà
    const existingType = await prisma.taskType.findFirst({
      where: { name: taskTypeArray[i] },
    });

    if (existingType) {
      // Si oui, ajoutez-le simplement au tableau
      taskTypes.push(existingType);
    } else {
      // Sinon, créez-le
      const newType = await prisma.taskType.create({
        data: { name: taskTypeArray[i] },
      });
      taskTypes.push(newType);
    }
  }
  return taskTypes;
};
