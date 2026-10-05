import { CreatePurchaseDto } from '../dto/create-purchase.dto';

export class Purchase {
  static countPurchase = 0;

  constructor(createPurchaseDto: CreatePurchaseDto) {
    Purchase.countPurchase++;
    this.id = Purchase.countPurchase;
    this.name = createPurchaseDto.name;
    this.description = createPurchaseDto.description ?? null;
    this.price = createPurchaseDto.price;
    this.deadlines = createPurchaseDto.deadlines ?? null;
    this.worksiteId = createPurchaseDto.worksiteId;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  id: number;

  name: string;

  description: string | null;

  price: number;

  deadlines: number | null;

  worksiteId: number;

  createdAt: Date;

  updatedAt: Date;
}
