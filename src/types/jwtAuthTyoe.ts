import { Response } from 'express';
import { Admin } from 'src/modules/admin/schemas/admin.schema';
import { User } from 'src/modules/user/schemas/user.schema';

export type JwtData = {
  refSecret: string;
  authSecret: string;
  payload?: Admin | User;
};
// export type JWtsRespnse = {
//   secrets: JwtData;
//   res: Response;
// };

export type toknes = {
  refreshToken: string;
  auhtToken: string;
};
