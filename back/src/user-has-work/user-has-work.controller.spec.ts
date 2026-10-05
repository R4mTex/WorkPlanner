import { Test, TestingModule } from '@nestjs/testing';
import { UserHasWorkController } from './user-has-work.controller';
import { UserHasWorkService } from './user-has-work.service';

describe('UserHasWorkController', () => {
  let controller: UserHasWorkController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserHasWorkController],
      providers: [UserHasWorkService],
    }).compile();

    controller = module.get<UserHasWorkController>(UserHasWorkController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
