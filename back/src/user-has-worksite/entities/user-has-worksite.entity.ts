import { CreateUserHasWorksiteDto } from '../dto/create-user-has-worksite.dto';

export class UserHasWorksite {
  constructor(createUserHasWorksiteDto: CreateUserHasWorksiteDto) {
    this.userId = createUserHasWorksiteDto.userId;
    this.worksiteId = createUserHasWorksiteDto.worksiteId;
  }

  userId: number;

  worksiteId: number;
}
