import { Test, TestingModule } from '@nestjs/testing';
import { UserHasNotificationController } from './user-has-notification.controller';
import { UserHasNotificationService } from './user-has-notification.service';

describe('UserHasNotificationController', () => {
  let controller: UserHasNotificationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserHasNotificationController],
      providers: [UserHasNotificationService],
    }).compile();

    controller = module.get<UserHasNotificationController>(UserHasNotificationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
