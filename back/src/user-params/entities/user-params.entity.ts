import { CreateUserParamsDto } from '../dto/create-user-params.dto';

export class UserParams {
  static countUserParams = 0;

  constructor(createUserParamsDto: CreateUserParamsDto) {
    UserParams.countUserParams++;
    this.id = UserParams.countUserParams;

    this.lastname = createUserParamsDto.lastname;
    this.firstname = createUserParamsDto.firstname;
    this.phoneNumber = createUserParamsDto.phoneNumber;
    this.streetNumber = createUserParamsDto.streetNumber ?? null;
    this.streetName = createUserParamsDto.streetName;
    this.postalCode = createUserParamsDto.postalCode;
    this.city = createUserParamsDto.city;
    this.country = createUserParamsDto.country;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.userId = createUserParamsDto.userId;
  }

  id: number;

  lastname: string;

  firstname: string;

  phoneNumber: string;

  streetNumber: string | null;

  streetName: string;

  postalCode: string;

  city: string;

  country: string;

  createdAt: Date;

  updatedAt: Date;

  userId: number;
}
