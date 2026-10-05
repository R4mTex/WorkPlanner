import { Test, TestingModule } from '@nestjs/testing';
import { UserParamsService } from './user-params.service';

describe('UserParamsService', () => {
  let service: UserParamsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserParamsService],
    }).compile();

    service = module.get<UserParamsService>(UserParamsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
