import { PartialType } from '@nestjs/mapped-types';
import { CreateWorksiteDto } from './create-worksite.dto';

export class UpdateWorksiteDto extends PartialType(CreateWorksiteDto) {}
