import { Test, TestingModule } from '@nestjs/testing';
import { TaskCategoryHasTaskTypeService } from './task-category-has-task-type.service';

describe('TaskCategoryHasTaskTypeService', () => {
  let service: TaskCategoryHasTaskTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskCategoryHasTaskTypeService],
    }).compile();

    service = module.get<TaskCategoryHasTaskTypeService>(TaskCategoryHasTaskTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
