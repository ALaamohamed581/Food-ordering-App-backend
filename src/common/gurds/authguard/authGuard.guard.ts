import {
  CanActivate,
  ExecutionContext,
  Injectable,
  mixin,
  UnauthorizedException,
} from '@nestjs/common';
import { JWTAuthService } from 'src/modules/utlis/JWTAuthServicer.service';
import { Payload } from 'src/types/JWTTypes';
declare module 'express' {
  interface Request {
    payload?: Payload;
    queryString?: any;
  }
}
export const AuthGuard = (role: string): any => {
  @Injectable()
  class AuthGuardMixin implements CanActivate {
    constructor(private readonly JWTAuthService: JWTAuthService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      let secret: string;
      const request = context.switchToHttp().getRequest();
      const { authCookie: token } = request.cookies;

      if (role === 'admin') {
        secret = process.env.ADMIN_AUTH_TOKEN_SECRET as string;
      } else {
        secret = process.env.USER_AUTH_TOKEN_SECRET as string;
      }
      if (!token) {
        throw new UnauthorizedException('No auth cookie found');
      }
      try {
        const decoded = this.JWTAuthService.VerifyAuthToken({ token, secret });

        request.payload = decoded.payload;

        return true;
      } catch (error) {
        console.log(error.message);
        throw new UnauthorizedException('Invalid or expired token');
      }
    }
  }

  return mixin(AuthGuardMixin);
};
