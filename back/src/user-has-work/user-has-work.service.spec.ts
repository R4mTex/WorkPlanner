import { Test, TestingModule } from '@nestjs/testing';
import { UserHasWorkService } from './user-has-work.service';

describe('UserHasWorkService', () => {
  let service: UserHasWorkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserHasWorkService],
    }).compile();

    service = module.get<UserHasWorkService>(UserHasWorkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
