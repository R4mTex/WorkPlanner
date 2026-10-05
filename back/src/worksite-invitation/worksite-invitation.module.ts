import { Module } from '@nestjs/common';
import { WorksiteInvitationService } from './worksite-invitation.service';
import { WorksiteInvitationController } from './worksite-invitation.controller';

@Module({
  controllers: [WorksiteInvitationController],
  providers: [WorksiteInvitationService],
})
export class WorksiteInvitationModule {}
