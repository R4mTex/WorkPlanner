import { Module } from '@nestjs/common';
import { WorksiteTypeService } from './worksite-type.service';
import { WorksiteTypeController } from './worksite-type.controller';

@Module({
  controllers: [WorksiteTypeController],
  providers: [WorksiteTypeService],
  // exports: [WorksiteTypeService],
})
export class WorksiteTypeModule {}
