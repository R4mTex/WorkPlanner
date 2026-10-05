import { Module } from '@nestjs/common';
import { UserHasWorkService } from './user-has-work.service';
import { UserHasWorkController } from './user-has-work.controller';

@Module({
  controllers: [UserHasWorkController],
  providers: [UserHasWorkService],
})
export class UserHasWorkModule {}
