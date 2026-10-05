import { Module } from '@nestjs/common';
import { WorksiteService } from './worksite.service';
import { WorksiteController } from './worksite.controller';
import { UploadService } from 'src/upload/upload.service';
// import { WorksiteTypeService } from 'src/worksite-type/worksite-type.service';

@Module({
    controllers: [WorksiteController],
    providers: [WorksiteService, UploadService],
})
export class WorksiteModule {}
