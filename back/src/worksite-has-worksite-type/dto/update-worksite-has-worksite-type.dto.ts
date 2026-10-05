import { PartialType } from '@nestjs/mapped-types';
import { CreateWorksiteHasWorksiteTypeDto } from './create-worksite-has-worksite-type.dto';

export class UpdateWorksiteHasWorksiteTypeDto extends PartialType(CreateWorksiteHasWorksiteTypeDto) {}
