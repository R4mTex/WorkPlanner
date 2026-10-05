import { Test, TestingModule } from '@nestjs/testing';
import { UserHasWorksiteController } from './user-has-worksite.controller';
import { UserHasWorksiteService } from './user-has-worksite.service';

describe('UserHasWorksiteController', () => {
  let controller: UserHasWorksiteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserHasWorksiteController],
      providers: [UserHasWorksiteService],
    }).compile();

    controller = module.get<UserHasWorksiteController>(UserHasWorksiteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
