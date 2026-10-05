import { Test, TestingModule } from '@nestjs/testing';
import { WorksiteHasWorksiteTypeService } from './worksite-has-worksite-type.service';

describe('WorksiteHasWorksiteTypeService', () => {
  let service: WorksiteHasWorksiteTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorksiteHasWorksiteTypeService],
    }).compile();

    service = module.get<WorksiteHasWorksiteTypeService>(WorksiteHasWorksiteTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
