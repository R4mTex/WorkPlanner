import { PartialType } from '@nestjs/mapped-types';
import { CreateWorksiteTypeDto } from './create-worksite-type.dto';

export class UpdateWorksiteTypeDto extends PartialType(CreateWorksiteTypeDto) {}
