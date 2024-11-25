import {
  CanActivate,
  ExecutionContext,
  Injectable,
  mixin,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Payload } from 'src/types/jwtAuthTyoe';
import { JWTAuthService } from 'src/utils/JWTAuthServicer.service';
declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

export const AuthGuard = (secret: string): any => {
  @Injectable()
  class AuthGuardMixin implements CanActivate {
    constructor(private readonly JWTAuthService: JWTAuthService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const { authCookie: authToken } = request.cookies;
      secret === 'admin'
        ? (secret = process.env.ADMIN_AUTH_TOKEN_SECRET)
        : (secret = process.env.USER_AUTH_TOKEN_SECRET);
      if (!authToken) {
        throw new UnauthorizedException('No auth cookie found');
      }
      try {
        const decoded = this.JWTAuthService.VerifyAuthToken(authToken, secret);

        request.userId = decoded.payload._id;

        return true;
      } catch (error) {
        console.log(error.message);
        throw new UnauthorizedException('Invalid or expired token');
      }
    }
  }

  return mixin(AuthGuardMixin);
};
