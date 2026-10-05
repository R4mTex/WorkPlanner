import { Test, TestingModule } from '@nestjs/testing';
import { UserHasTaskService } from './user-has-task.service';

describe('UserHasTaskService', () => {
  let service: UserHasTaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserHasTaskService],
    }).compile();

    service = module.get<UserHasTaskService>(UserHasTaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
