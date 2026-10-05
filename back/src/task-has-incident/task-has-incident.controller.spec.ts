import { Test, TestingModule } from '@nestjs/testing';
import { TaskHasIncidentController } from './task-has-incident.controller';
import { TaskHasIncidentService } from './task-has-incident.service';

describe('TaskHasIncidentController', () => {
  let controller: TaskHasIncidentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskHasIncidentController],
      providers: [TaskHasIncidentService],
    }).compile();

    controller = module.get<TaskHasIncidentController>(TaskHasIncidentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
