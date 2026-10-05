import { Test, TestingModule } from '@nestjs/testing';
import { UserHasWorksiteService } from './user-has-worksite.service';

describe('UserHasWorksiteService', () => {
  let service: UserHasWorksiteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserHasWorksiteService],
    }).compile();

    service = module.get<UserHasWorksiteService>(UserHasWorksiteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
