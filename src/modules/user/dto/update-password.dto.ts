import { IsString } from 'class-validator';

import { Match } from '../decoratores/Match';

export class UpdatePasswordDTO {
  @IsString()
  Oldpassword: string;

  @IsString()
  newPassword: string;

  @IsString()
  @Match('newPassword', { message: 'reEnteredPassword must match newPassword' })
  reEntredPassword: string;
}
