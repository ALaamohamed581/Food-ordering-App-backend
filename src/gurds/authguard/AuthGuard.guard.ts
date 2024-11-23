import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

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
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
