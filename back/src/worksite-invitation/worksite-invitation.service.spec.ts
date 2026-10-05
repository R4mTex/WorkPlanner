import { Test, TestingModule } from '@nestjs/testing';
import { WorksiteInvitationService } from './worksite-invitation.service';

describe('WorksiteInvitationService', () => {
  let service: WorksiteInvitationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorksiteInvitationService],
    }).compile();

    service = module.get<WorksiteInvitationService>(WorksiteInvitationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
