import {
  Injectable,
  NestMiddleware,
  Next,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class ValditeJwt implements NestMiddleware {
  constructor(private readonly jwt: JwtService) {}
  use(req: any, res: any, next: (error?: Error | any) => void) {
    const {
      cookies: { authCookie },
    } = req;
    this.valdiete(authCookie);
    Next();
  }
  valdiete(token: string) {
    if (!this.jwt.verify(token, { secret: process.env.AUTH_TOKEN_SECRET }))
      return new UnauthorizedException('Unauthorized');
    return true;
  }
}
