import { Test, TestingModule } from '@nestjs/testing';
import { IncidentTypeService } from './incident-type.service';

describe('IncidentTypeService', () => {
  let service: IncidentTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IncidentTypeService],
    }).compile();

    service = module.get<IncidentTypeService>(IncidentTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
