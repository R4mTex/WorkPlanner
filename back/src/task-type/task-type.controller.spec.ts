import { Test, TestingModule } from '@nestjs/testing';
import { TaskTypeController } from './task-type.controller';
import { TaskTypeService } from './task-type.service';

describe('TaskTypeController', () => {
  let controller: TaskTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskTypeController],
      providers: [TaskTypeService],
    }).compile();

    controller = module.get<TaskTypeController>(TaskTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
