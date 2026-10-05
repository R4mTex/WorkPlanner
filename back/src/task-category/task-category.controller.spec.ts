import { Test, TestingModule } from '@nestjs/testing';
import { TaskCategoryController } from './task-category.controller';
import { TaskCategoryService } from './task-category.service';

describe('TaskCategoryController', () => {
  let controller: TaskCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskCategoryController],
      providers: [TaskCategoryService],
    }).compile();

    controller = module.get<TaskCategoryController>(TaskCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
