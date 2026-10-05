import { Test, TestingModule } from '@nestjs/testing';
import { WorksiteTypeService } from './worksite-type.service';

describe('WorksiteTypeService', () => {
  let service: WorksiteTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorksiteTypeService],
    }).compile();

    service = module.get<WorksiteTypeService>(WorksiteTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
