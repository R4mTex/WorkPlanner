import * as redisStore from 'cache-manager-redis-store';

import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';
import { AuthModule } from './auth/auth.module';
import { IncidentHasIncidentTypeModule } from './incident-has-incident-type/incident-has-incident-type.module';
import { IncidentModule } from './incident/incident.module';
import { IncidentTypeModule } from './incident-type/incident-type.module';
import { IntervenantModule } from './intervenant/intervenant.module';
import { InvoiceModule } from './invoice/invoice.module';
import { NotificationModule } from './notification/notification.module';
import { PrismaModule } from 'prisma/prisma.module';
import { ProfessionalModule } from './professional/professional.module';
import { PurchaseHasInvoiceModule } from './purchase-has-invoice/purchase-has-invoice.module';
import { PurchaseModule } from './purchase/purchase.module';
import { TaskCategoryHasTaskTypeModule } from './task-category-has-task-type/task-category-has-task-type.module';
import { TaskCategoryModule } from './task-category/task-category.module';
import { TaskHasIncidentModule } from './task-has-incident/task-has-incident.module';
import { TaskModule } from './task/task.module';
import { TaskTypeModule } from './task-type/task-type.module';
import { TradeModule } from './trade/trade.module';
import { UploadModule } from './upload/upload.module';
import { UserHasNotificationModule } from './user-has-notification/user-has-notification.module';
import { UserHasTaskModule } from './user-has-task/user-has-task.module';
import { UserHasWorkModule } from './user-has-work/user-has-work.module';
import { UserHasWorksiteModule } from './user-has-worksite/user-has-worksite.module';
import { UserModule } from './user/user.module';
import { UserParamsModule } from './user-params/user-params.module';
import { WorkHasTradeModule } from './work-has-trade/work-has-trade.module';
import { WorkModule } from './work/work.module';
import { WorksiteHasWorksiteTypeModule } from './worksite-has-worksite-type/worksite-has-worksite-type.module';
import { WorksiteInvitationModule } from './worksite-invitation/worksite-invitation.module';
import { WorksiteTypeModule } from './worksite-type/worksite-type.module';
import { WorksiteModule } from './worksite/worksite.module';

@Module({
    imports: [
        CacheModule.register({
            isGlobal: true,
            store: redisStore as any,
            url: 'redis://localhost:6379',
            ttl: 3600,
        }),
        AuthModule,
        IncidentHasIncidentTypeModule,
        IncidentModule,
        IncidentTypeModule,
        IntervenantModule,
        InvoiceModule,
        NotificationModule,
        PrismaModule,
        ProfessionalModule,
        PurchaseHasInvoiceModule,
        PurchaseModule,
        TaskCategoryHasTaskTypeModule,
        TaskCategoryModule,
        TaskHasIncidentModule,
        TaskModule,
        TaskTypeModule,
        TradeModule,
        UploadModule,
        UserHasNotificationModule,
        UserHasTaskModule,
        UserHasWorkModule,
        UserHasWorksiteModule,
        UserModule,
        UserParamsModule,
        WorkHasTradeModule,
        WorkModule,
        WorksiteHasWorksiteTypeModule,
        WorksiteInvitationModule,
        WorksiteModule,
        WorksiteTypeModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
    ],
})
export class AppModule {}
