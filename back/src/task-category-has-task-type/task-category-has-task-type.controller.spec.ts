import { Test, TestingModule } from '@nestjs/testing';
import { TaskCategoryHasTaskTypeController } from './task-category-has-task-type.controller';
import { TaskCategoryHasTaskTypeService } from './task-category-has-task-type.service';

describe('TaskCategoryHasTaskTypeController', () => {
  let controller: TaskCategoryHasTaskTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskCategoryHasTaskTypeController],
      providers: [TaskCategoryHasTaskTypeService],
    }).compile();

    controller = module.get<TaskCategoryHasTaskTypeController>(TaskCategoryHasTaskTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
