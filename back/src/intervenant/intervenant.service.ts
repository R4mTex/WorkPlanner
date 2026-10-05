import { Injectable } from '@nestjs/common';
import { Intervenant } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class IntervenantService {
    constructor(private readonly prisma: PrismaService) {}

    async findAll(): Promise<Intervenant[]> {
        return this.prisma.intervenant.findMany();
    }
}
