import { CreateAdminDto } from 'src/modules/admin/dto/creaeteAdmin.dto';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';

export type JwtData = {
  refSecret: string;
  authSecret: string;
  payload?: Payload;
};

export type toknes = {
  refreshToken: string;
  auhtToken: string;
};

export type Payload = CreateAdminDto | CreateUserDto;
