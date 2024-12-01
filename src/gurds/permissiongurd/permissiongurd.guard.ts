import {
  CanActivate,
  ExecutionContext,
  Injectable,
  mixin,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
export const permissiongurd = (permissiongurd: string): any => {
  @Injectable()
  class permissionMixin implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    async canActivate(context: ExecutionContext) {
      const req = context.switchToHttp().getRequest();
      const { authCookie: authToken } = req.cookies;

      const decoded = await this.jwtService.verify(authToken, {
        secret: process.env.ADMIN_AUTH_TOKEN_SECRET,
      });

      if (decoded.payload.role === 'superAdmin') {
        return true;
      } else if (
        !decoded.payload.permissions.some((el: string) => el === permissiongurd)
      )
        return false;
    }
  }
  return mixin(permissionMixin);
};
