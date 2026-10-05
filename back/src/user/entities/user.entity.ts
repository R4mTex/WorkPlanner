import { CreateUserDto } from '../dto/create-user.dto';
import { Role } from '@prisma/client';

export class User {
  static countUser = 0;

  constructor(createUserDto: CreateUserDto) {
    User.countUser++;
    this.id = User.countUser;
    this.email = createUserDto.email;
    this.password = createUserDto.password;
    this.role = createUserDto.role;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  id: number;

  email: string;

  password: string;

  role: Role;

  createdAt: Date;

  updatedAt: Date;
}
