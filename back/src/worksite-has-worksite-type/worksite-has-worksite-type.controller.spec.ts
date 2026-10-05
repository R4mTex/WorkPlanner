import { Test, TestingModule } from '@nestjs/testing';
import { WorksiteHasWorksiteTypeController } from './worksite-has-worksite-type.controller';
import { WorksiteHasWorksiteTypeService } from './worksite-has-worksite-type.service';

describe('WorksiteHasWorksiteTypeController', () => {
  let controller: WorksiteHasWorksiteTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorksiteHasWorksiteTypeController],
      providers: [WorksiteHasWorksiteTypeService],
    }).compile();

    controller = module.get<WorksiteHasWorksiteTypeController>(WorksiteHasWorksiteTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
