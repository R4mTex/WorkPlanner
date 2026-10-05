import { CreateWorksiteDto } from '../dto/create-worksite.dto';

export class Worksite {
    static countWorksite = 0;

    constructor(createWorksiteDto: CreateWorksiteDto) {
        Worksite.countWorksite++;
        this.id = Worksite.countWorksite;

        this.name = createWorksiteDto.name;
        this.description = createWorksiteDto.description;
        this.start = createWorksiteDto.start;
        this.end = createWorksiteDto.end;
        this.duration = createWorksiteDto.duration;
        this.formattedDuration = createWorksiteDto.formattedDuration;
        this.picture = createWorksiteDto.picture;
        this.streetNumber = createWorksiteDto.streetNumber ?? null;
        this.streetName = createWorksiteDto.streetName;
        this.postalCode = createWorksiteDto.postalCode;
        this.country = createWorksiteDto.country;
        this.city = createWorksiteDto.city;

        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    id: number;

    name: string;

    description: string;

    start: Date;

    end: Date;

    duration: number;

    formattedDuration: string;

    picture: string;

    streetNumber: string | null;

    streetName: string;

    postalCode: string;

    country: string;

    city: string;

    createdAt: Date;

    updatedAt: Date;
}
