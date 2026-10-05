import { Test, TestingModule } from '@nestjs/testing';
import { UserHasTaskController } from './user-has-task.controller';
import { UserHasTaskService } from './user-has-task.service';

describe('UserHasTaskController', () => {
  let controller: UserHasTaskController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserHasTaskController],
      providers: [UserHasTaskService],
    }).compile();

    controller = module.get<UserHasTaskController>(UserHasTaskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
