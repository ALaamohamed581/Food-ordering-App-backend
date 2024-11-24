import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authCookie = request.cookies?.authCookie;

    if (!authCookie) {
      throw new UnauthorizedException('No auth cookie found');
    }

    try {
      const decoded = this.jwtService.verify(authCookie, {
        secret: process.env.AUTH_TOKEN_SECRET,
      });
      request.userId = decoded.existingUser._id;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
