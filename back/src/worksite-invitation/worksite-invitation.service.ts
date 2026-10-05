import { Injectable } from '@nestjs/common';
import { CreateWorksiteInvitationDto } from './dto/create-worksite-invitation.dto';
import { PrismaService } from 'prisma/prisma.service';
import { WorksiteInvitation } from '@prisma/client';

@Injectable()
export class WorksiteInvitationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createWorksiteInvitationDto: CreateWorksiteInvitationDto,
  ): Promise<WorksiteInvitation> {
    return await this.prisma.worksiteInvitation.create({
      data: createWorksiteInvitationDto,
    });
  }

  async findAll(): Promise<WorksiteInvitation[] | null> {
    return await this.prisma.worksiteInvitation.findMany({
      orderBy: {
        id: 'asc',
      },
    });
  }

  async findOne(id: number): Promise<WorksiteInvitation | null> {
    return await this.prisma.worksiteInvitation.findUnique({
      where: {
        id,
      },
    });
  }

  async remove(id: number): Promise<WorksiteInvitation> {
    return await this.prisma.worksiteInvitation.delete({
      where: {
        id,
      },
    });
  }
}
