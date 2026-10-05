import { Module } from '@nestjs/common';
import { WorksiteHasWorksiteTypeService } from './worksite-has-worksite-type.service';
import { WorksiteHasWorksiteTypeController } from './worksite-has-worksite-type.controller';

@Module({
  controllers: [WorksiteHasWorksiteTypeController],
  providers: [WorksiteHasWorksiteTypeService],
})
export class WorksiteHasWorksiteTypeModule {}
