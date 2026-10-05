import { PrismaClient, Trade } from '@prisma/client';

const prisma = new PrismaClient();

// === Gros Œuvre – Structural Work ===
const enumTradesStructuralWork = [
  'Mason', // Travaux de maçonnerie : fondations, murs porteurs, dalles
  'Excavator/Earthworker', // Terrassement et préparation du terrain
  'Concrete worker', // Coulage et finition du béton (dalles, murs, planchers)
  'Steel fixer', // Pose des armatures métalliques pour béton armé
  'Carpenter', // Charpentier bois ou coffreur (coffrages en béton)
  'Roofer', // Couverture du bâtiment : tuiles, ardoises, etc.
  'Waterproofer', // Étanchéité des toitures, terrasses, sous-sols
];

// === Second Œuvre – Secondary Work ===
const enumTradesSecondaryWork = [
  'Plasterer', // Enduits sur murs et plafonds
  'Insulation installer', // Pose d'isolants thermiques et acoustiques
  'Partition installer', // Cloisons intérieures (type placo)
  'Ceiling installer', // Faux plafonds et plafonds suspendus
  'Ventilation installer', // Installation de VMC simple/double flux
  'Heating technician', // Chauffage central, chaudières, radiateurs
  'Air conditioning technician', // Climatisation résidentielle et tertiaire
  'Fire safety technician', // Systèmes de détection incendie, portes coupe-feu
  'Low-voltage electrician', // Interphonie, domotique, alarmes
  'Data cabling technician', // Réseaux informatiques, câblage RJ45
  'Sanitary installer', // Installation de sanitaires (lavabos, WC, douches)
  'Interior joiner', // Menuiserie intérieure (escaliers, placards sur mesure)
];

// === Finitions – Finishing Work ===
const enumTradesFinishingWork = [
  'Plumber', // Plomberie générale (alimentation, évacuation)
  'Electrician', // Installation électrique (courant fort)
  'Drywall installer', // Pose de plaques de plâtre
  'Joiner/Woodworker', // Pose de portes, plinthes, éléments bois
  'Tile setter', // Carrelage sols et murs
  'Painter', // Peinture intérieure/extérieure
  'Flooring installer', // Pose de revêtements de sol (parquet, vinyle, moquette)
  'Heating engineer', // Chauffage (pompes à chaleur, chaudières)
  'Locksmith', // Serrurerie : verrous, cylindres, fermetures
  'Glazier', // Pose de vitrages et miroirs
  'Façade specialist', // Bardage, enduit de façade, ravalement
];

// === Métiers Spécialisés – Specialized Trades ===
const enumTradesSpecialized = [
  'Architect', // Conception des plans et du projet architectural
  'Surveyor', // Mesurages, implantation, topographie
  'Construction manager', // Gestion de projet, coordination globale
  'Site supervisor', // Suivi du chantier au quotidien
  'Building inspector', // Contrôle technique, conformité
  'HVAC installer', // Chauffage, ventilation et climatisation (CVC)
  'Ironworker', // Structures métalliques, charpentes acier
  'Ornamental plasterer', // Staff, moulures, stucs décoratifs
  'Acoustician', // Traitement acoustique des espaces
  'Elevator technician', // Installation et maintenance des ascenseurs
  'Marble worker', // Pose et découpe de marbre, granit, pierre naturelle
];

export const createPredefinedTrades = async (): Promise<Trade[]> => {
  const trades: Trade[] = [];

  const allTradeNames = [
    ...enumTradesStructuralWork,
    ...enumTradesSecondaryWork,
    ...enumTradesFinishingWork,
    ...enumTradesSpecialized,
  ];

  for (const tradeName of allTradeNames) {
    const trade = await prisma.trade.upsert({
      where: { name: tradeName },
      update: {},
      create: {
        name: tradeName,
      },
    });
    trades.push(trade);
  }
  return trades;
};
