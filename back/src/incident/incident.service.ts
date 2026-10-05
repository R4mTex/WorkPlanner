import { Injectable } from '@nestjs/common';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { UpdateIncidentDto } from './dto/update-incident.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Incident, IncidentStatus, Prisma } from '@prisma/client';
import { Filters } from 'src/interface';

interface IncidentFilters extends Filters {
    status?: IncidentStatus;
    description?: string;
}

const incidentWithRelations = Prisma.validator<Prisma.IncidentDefaultArgs>()({
    include: {
        incidentTypes: {
            include: {
                incidentType: true,
            },
        },
    },
});

type IncidentWithRelations = Prisma.IncidentGetPayload<
    typeof incidentWithRelations
>;

@Injectable()
export class IncidentService {
    constructor(private readonly prisma: PrismaService) {}

    async create(
        createIncidentDto: CreateIncidentDto,
        taskId: number,
    ): Promise<Incident> {
        const incident = await this.prisma.incident.create({
            data: createIncidentDto,
        });

        await this.prisma.incidentHasIncidentType.create({
            data: {
                incidentId: incident.id,
                incidentTypeId: incident.incidentTypeId,
            },
        });

        await this.prisma.taskHasIncident.create({
            data: {
                incidentId: incident.id,
                taskId,
            },
        });

        return incident;
    }

    async update(
        id: number,
        updateIncidentDto: Partial<UpdateIncidentDto>,
    ): Promise<Incident> {
        const incident = await this.prisma.incident.update({
            where: { id },
            data: updateIncidentDto,
        });

        await this.prisma.incidentHasIncidentType.updateMany({
            where: {
                incidentId: id,
            },
            data: {
                incidentTypeId: incident.incidentTypeId,
            },
        });

        return incident;
    }

    async remove(id: number): Promise<Incident> {
        return this.prisma.incident.delete({
            where: { id },
        });
    }

    async findOne(id: number): Promise<IncidentWithRelations | null> {
        return await this.prisma.incident.findUnique({
            include: {
                incidentTypes: {
                    include: {
                        incidentType: true,
                    },
                },
            },
            where: { id },
        });
    }

    async findByFilters(
        filters: IncidentFilters,
    ): Promise<IncidentWithRelations[] | { message: string }> {
        const where: any = {};
        const orderBy: any = {};
        orderBy.createdAt = orderBy.createdAt || 'asc';

        for (const [key, value] of Object.entries(filters)) {
            switch (key) {
                case 'name':
                    if (value) {
                        where.name = { contains: value };
                    }
                    break;

                case 'status':
                    if (value) {
                        where.status = value;
                    }
                    break;

                case 'sortOrder':
                    if (value) {
                        orderBy.createdAt = value;
                    }
                    break;
            }
        }

        const incidents = await this.prisma.incident.findMany({
            include: {
                incidentTypes: {
                    include: {
                        incidentType: true,
                    },
                },
            },
            where,
            orderBy,
        });

        // if (incidents.length === 0) {
        //   return {
        //     message: 'Aucun incident trouvé avec les critères spécifiés',
        //   };
        // }

        return incidents;
    }
}
