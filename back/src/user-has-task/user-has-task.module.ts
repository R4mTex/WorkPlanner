import { Module } from '@nestjs/common';
import { UserHasTaskService } from './user-has-task.service';
import { UserHasTaskController } from './user-has-task.controller';

@Module({
  controllers: [UserHasTaskController],
  providers: [UserHasTaskService],
})
export class UserHasTaskModule {}
