import {
  CanActivate,
  ExecutionContext,
  Injectable,
  mixin,
} from '@nestjs/common';
import { JWTAuthService } from 'src/modules/utlis/JWTAuthServicer.service';
export const permissiongurd = (permissiongurd: string): any => {
  @Injectable()
  class permissionMixin implements CanActivate {
    constructor(private readonly JWTAuthService: JWTAuthService) {}

    async canActivate(context: ExecutionContext) {
      const req = context.switchToHttp().getRequest();
      const { authCookie: token } = req.cookies;

      const decoded = await this.JWTAuthService.VerifyAuthToken({
        token,
        secret: process.env.ADMIN_AUTH_TOKEN_SECRET as string,
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
