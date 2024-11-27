import { CreateAdminDto } from 'src/modules/admin/dto/creaeteAdmin.dto';
import { Admin } from 'src/modules/admin/schemas/admin.schema';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { User } from 'src/modules/user/schemas/user.schema';

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
