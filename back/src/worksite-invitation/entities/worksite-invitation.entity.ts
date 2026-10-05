import { CreateWorksiteInvitationDto } from '../dto/create-worksite-invitation.dto';

export class WorksiteInvitation {
  static countInvitation = 0;

  constructor(createWorksiteInvitationDto: CreateWorksiteInvitationDto) {
    WorksiteInvitation.countInvitation++;
    this.id = WorksiteInvitation.countInvitation;
    this.email = createWorksiteInvitationDto.email;
    this.worksiteId = createWorksiteInvitationDto.worksiteId;
  }

  id: number;

  email: string;

  worksiteId: number;
}
