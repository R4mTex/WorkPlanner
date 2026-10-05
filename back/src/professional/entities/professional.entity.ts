import { CreateProfessionalDto } from '../dto/create-professional.dto';

export class Professional {
  static countProfessional = 0;

  constructor(createProfessionalDto: CreateProfessionalDto) {
    Professional.countProfessional++;
    this.id = Professional.countProfessional;

    this.phoneNumber = createProfessionalDto.phoneNumber;
    this.name = createProfessionalDto.name;
    this.managerName = createProfessionalDto.managerName ?? null;
    this.legalStatus = createProfessionalDto.legalStatus;
    this.workforce = createProfessionalDto.workforce;
    this.streetNumber = createProfessionalDto.streetNumber ?? null;
    this.streetName = createProfessionalDto.streetName;
    this.postalCode = createProfessionalDto.postalCode;
    this.city = createProfessionalDto.city;
    this.country = createProfessionalDto.country;
    this.userId = createProfessionalDto.userId;

    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  id: number;

  phoneNumber: string;

  name: string;

  managerName: string | null;

  legalStatus: string;

  workforce: number;

  streetNumber: string | null;

  streetName: string;

  postalCode: string;

  city: string;

  country: string;

  userId: number;

  createdAt: Date;

  updatedAt: Date;
}
