import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  mixin,
  CallHandler,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

export const accessToken = ({ role, secret, Payload }: any): any => {
  class AccesTokenMixin implements NestInterceptor {
    constructor(private readonly jwtService: JwtService) {}
    intercept(
      context: ExecutionContext,
      next: CallHandler<any>,
    ): Observable<any> | Promise<Observable<any>> {
      const res = context.switchToHttp().getResponse();

      role === 'admin'
        ? (secret = process.env.ADMIN_AUTH_TOKEN_SECRET)
        : (secret = process.env.USER_AUTH_TOKEN_SECRET);

      const authToken = this.generateJwt(secret, Payload);
      res
        .cookie('authCookie', authToken, {
          maxAge: 1000 * 60 * 15,
          secure: true,
          httpOnly: true,
        })
        .status(200)
        .json({ message: 'new token accqureid' });
      return next.handle();
    }
    generateJwt(secret: string, payload: any) {
      return this.jwtService.sign(
        { payload },
        {
          secret: secret,
          expiresIn: '15m',
        },
      );
    }
  }
  return mixin(AccesTokenMixin);
};
