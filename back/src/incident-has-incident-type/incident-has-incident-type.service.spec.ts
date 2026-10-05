import { Test, TestingModule } from '@nestjs/testing';
import { IncidentHasIncidentTypeService } from './incident-has-incident-type.service';

describe('IncidentHasIncidentTypeService', () => {
  let service: IncidentHasIncidentTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IncidentHasIncidentTypeService],
    }).compile();

    service = module.get<IncidentHasIncidentTypeService>(IncidentHasIncidentTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
