import { Test, TestingModule } from '@nestjs/testing';
import { UserHasNotificationService } from './user-has-notification.service';

describe('UserHasNotificationService', () => {
  let service: UserHasNotificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserHasNotificationService],
    }).compile();

    service = module.get<UserHasNotificationService>(UserHasNotificationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
