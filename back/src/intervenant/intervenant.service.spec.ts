import { Test, TestingModule } from '@nestjs/testing';
import { IntervenantService } from './intervenant.service';

describe('IntervenantService', () => {
  let service: IntervenantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IntervenantService],
    }).compile();

    service = module.get<IntervenantService>(IntervenantService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
