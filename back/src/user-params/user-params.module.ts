import { Module } from '@nestjs/common';
import { UserParamsService } from './user-params.service';
import { UserParamsController } from './user-params.controller';

@Module({
  controllers: [UserParamsController],
  providers: [UserParamsService],
})
export class UserParamsModule {}
