import { CreateUserHasWorkDto } from '../dto/create-user-has-work.dto';

export class UserHasWork {
  constructor(createUserHasWorkDto: CreateUserHasWorkDto) {
    this.userId = createUserHasWorkDto.userId;
    this.workId = createUserHasWorkDto.workId;
  }

  userId: number;

  workId: number;
}
