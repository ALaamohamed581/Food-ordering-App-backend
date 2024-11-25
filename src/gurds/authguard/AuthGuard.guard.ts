import {
  CanActivate,
  ExecutionContext,
  Injectable,
  mixin,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
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
    constructor(private readonly jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const authCookie = request.cookies?.authCookie;
      secret === 'admin'
        ? (secret = process.env.ADMIN_AUTH_TOKEN_SECRET)
        : (secret = process.env.USER_AUTH_TOKEN_SECRET);
      if (!authCookie) {
        throw new UnauthorizedException('No auth cookie found');
      }
      try {
        const decoded = await this.jwtService.verify(authCookie, {
          secret,
        });
        request.userId = decoded.payload._id;
        return true;
      } catch (error) {
        throw new UnauthorizedException('Invalid or expired token');
      }
    }
  }

  return mixin(AuthGuardMixin);
};
