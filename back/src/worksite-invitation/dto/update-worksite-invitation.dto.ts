import { PartialType } from '@nestjs/mapped-types';
import { CreateWorksiteInvitationDto } from './create-worksite-invitation.dto';

export class UpdateWorksiteInvitationDto extends PartialType(CreateWorksiteInvitationDto) {}
