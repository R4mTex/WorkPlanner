import { Test, TestingModule } from '@nestjs/testing';
import { WorksiteInvitationController } from './worksite-invitation.controller';
import { WorksiteInvitationService } from './worksite-invitation.service';

describe('WorksiteInvitationController', () => {
  let controller: WorksiteInvitationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorksiteInvitationController],
      providers: [WorksiteInvitationService],
    }).compile();

    controller = module.get<WorksiteInvitationController>(WorksiteInvitationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
