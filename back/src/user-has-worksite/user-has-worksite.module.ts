import { Module } from '@nestjs/common';
import { UserHasWorksiteService } from './user-has-worksite.service';
import { UserHasWorksiteController } from './user-has-worksite.controller';

@Module({
  controllers: [UserHasWorksiteController],
  providers: [UserHasWorksiteService],
})
export class UserHasWorksiteModule {}
