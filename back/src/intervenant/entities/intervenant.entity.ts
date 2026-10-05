import { IntervenantStatus } from '@prisma/client';
import { CreateIntervenantDto } from '../dto/create-intervenant.dto'; // Assurez-vous de créer un DTO approprié

export class Intervenant {
    static countIntervenant = 0;

    constructor(createIntervenantDto: CreateIntervenantDto) {
        Intervenant.countIntervenant++;
        this.id = Intervenant.countIntervenant;
        this.lastname = createIntervenantDto.lastname;
        this.firstname = createIntervenantDto.firstname;
        this.phoneNumber = createIntervenantDto.phoneNumber;
        this.status =
            createIntervenantDto.status || IntervenantStatus.Disponible; // Valeur par défaut
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    id: number;

    lastname: string;

    firstname: string;

    phoneNumber: string;

    status: IntervenantStatus;

    createdAt: Date;

    updatedAt: Date;
}
