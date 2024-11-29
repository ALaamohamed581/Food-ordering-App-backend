import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  mixin,
  CallHandler,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { JWTAuthService } from 'src/utlis/JWTAuthServicer.service';
export const SignIn = ({ role, authSecret = '', refSecret = '' }): any => {
  @Injectable()
  class SignInMixin implements NestInterceptor {
    constructor(private readonly jwt: JWTAuthService) {}

    intercept(
      context: ExecutionContext,
      next: CallHandler<any>,
    ): Observable<any> | Promise<Observable<any>> {
      const res = context.switchToHttp().getResponse();
      const req = context.switchToHttp().getRequest();
      role === 'admin'
        ? ((authSecret = process.env.ADMIN_AUTH_TOKEN_SECRET),
          (refSecret = process.env.ADMIN_REFRESH_TOKEN_SECRET))
        : ((authSecret = process.env.USER_AUTH_TOKEN_SECRET),
          (refSecret = process.env.USER_REFRESH_TOKEN_SECRET));

      return next.handle().pipe(
        tap(() => {
          const { refreshToken, authToken } = this.jwt.generateTokens({
            authSecret,
            refSecret,
            payload: req.payload,
          });
          res
            .cookie('refCookie', refreshToken, {
              maxAge: 1000 * 60 * 60 * 24, // 24 hours
              secure: true,
            })
            .cookie('authCookie', authToken, {
              maxAge: 1000 * 60 * 15, // 15 minutes
              secure: true,
              httpOnly: true,
            })
            .status(200);
        }),
      );
    }
  }
  return mixin(SignInMixin);
};