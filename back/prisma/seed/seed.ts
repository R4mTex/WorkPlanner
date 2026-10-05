import { PrismaClient } from '@prisma/client';

import { createIncident } from './seedIncidents';
import { createIncidentHasIncidentType } from './seedIncidentHasIncidentType';
import { createIncidentType } from './seedIncidentType';
import { createInvoice } from './seedInvoices';
import { createNotification } from './seedNotifications';
import { createPurchase } from './seedPurchases';
import { createTask } from './seedTasks';
import { createTaskCategory } from './seedTaskCategory';
import { createTaskCategoryHasTaskType } from './seedTaskCategoryHasTaskType';
import { createTaskHasIncident } from './seedTaskHasIncident';
import { createTaskType } from './seedTaskType';
import { createUser } from './seedUsers';
import { createUserHasNotification } from './seedUserHasNotification';
import { createUserHasTask } from './seedUserHasTask';
import { createUserHasTrade } from './seedUserHasTrade';
import { createUserHasWorksite } from './seedUserHasWorksite';
import { createWork } from './seedCreateWork';
import { createWorkHasTrade } from './seedWorkHasTrades';
import { createWorksite } from './seedWorkSites';
import { createWorksiteHasWorksiteType } from './seedWorksiteHasWorksiteType';
import { createWorksiteInvitations } from './seedWorksiteInvitation';
import { createWorksiteType } from './seedWorksiteType';
import { createPredefinedTrades } from './seedTrades';
import { createIntervenant } from './seedIntervenant';
const prisma = new PrismaClient();

async function main() {
    // on crée les trade
    await createPredefinedTrades();

    // on crée les work
    await createWork();
    // table de liason
    await createWorkHasTrade();

    // on crée les type de worksite
    await createWorksiteType();
    //table de liaison
    await createWorksiteHasWorksiteType();

    //TaskCategory
    await createTaskCategory();
    // on crée les type task
    await createTaskType();
    // table de liason
    await createTaskCategoryHasTaskType();

    // on crée les type incident
    await createIncidentType();
    // table de liaison
    await createIncidentHasIncidentType();

    // on crée les chantier
    await createWorksite(10);

    await createWorksiteInvitations(5);

    // on crée les task, incident, purchase, invoice
    const tasks = await createTask();
    const incidents = await createIncident();
    await createPurchase();
    await createIntervenant();
    // Then create the relationships
    await createTaskHasIncident(tasks, incidents);

    //PurchaseHasInvoice
    await createInvoice();

    await createNotification(8);

    // on crée le utilsateur
    await createUser(10);

    await createUserHasNotification();

    await createUserHasTask();

    await createUserHasTrade();

    await createUserHasWorksite();

    await prisma.$disconnect();
}

main().catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
