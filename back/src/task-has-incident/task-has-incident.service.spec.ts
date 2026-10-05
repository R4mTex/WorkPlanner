import { Test, TestingModule } from '@nestjs/testing';
import { TaskHasIncidentService } from './task-has-incident.service';

describe('TaskHasIncidentService', () => {
  let service: TaskHasIncidentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskHasIncidentService],
    }).compile();

    service = module.get<TaskHasIncidentService>(TaskHasIncidentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
