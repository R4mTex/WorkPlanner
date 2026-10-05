import { Test, TestingModule } from '@nestjs/testing';
import { IncidentHasIncidentTypeController } from './incident-has-incident-type.controller';
import { IncidentHasIncidentTypeService } from './incident-has-incident-type.service';

describe('IncidentHasIncidentTypeController', () => {
  let controller: IncidentHasIncidentTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IncidentHasIncidentTypeController],
      providers: [IncidentHasIncidentTypeService],
    }).compile();

    controller = module.get<IncidentHasIncidentTypeController>(IncidentHasIncidentTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
