import { Test, TestingModule } from '@nestjs/testing';
import { UserParamsController } from './user-params.controller';
import { UserParamsService } from './user-params.service';

describe('UserParamsController', () => {
  let controller: UserParamsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserParamsController],
      providers: [UserParamsService],
    }).compile();

    controller = module.get<UserParamsController>(UserParamsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
