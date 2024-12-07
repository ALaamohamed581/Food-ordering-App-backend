import { Admin } from 'src/modules/admin/schemas/admin.schema';
import { User } from '../modules/UserModules/user/schemas/user.schema';

export type TokenData = {
  token: string;
  secret: string;
};
export type Token = {
  payload: Payload;
  secret: string;
  expiresIn: string;
};

export type Payload = Admin | User;
