import { UpdateUserDto } from './update-user.dto';
import { UpdateUserParamsDto } from 'src/user-params/dto/update-user-params.dto';
import { UpdateProfessionalDto } from 'src/professional/dto/update-professional.dto';

export class UpdateCompleteUserDto {
  user: Partial<UpdateUserDto>;
  userParams?: Partial<UpdateUserParamsDto>;
  professional?: Partial<UpdateProfessionalDto>;
}
