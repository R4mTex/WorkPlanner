import { Test, TestingModule } from '@nestjs/testing';
import { WorksiteTypeController } from './worksite-type.controller';
import { WorksiteTypeService } from './worksite-type.service';

describe('WorksiteTypeController', () => {
  let controller: WorksiteTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorksiteTypeController],
      providers: [WorksiteTypeService],
    }).compile();

    controller = module.get<WorksiteTypeController>(WorksiteTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
