import { Admin } from 'src/modules/admin/schemas/admin.schema';
import { User } from 'src/modules/user/schemas/user.schema';

export type JwtData = {
  refSecret?: string;
  authSecret: string;
  payload?: Payload;
};

export type TokenData = {
  token: string;
  secret: string;
};

export type Payload = Admin | User;
