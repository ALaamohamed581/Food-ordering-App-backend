import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  mixin,
  CallHandler,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { JWTAuthService } from '../modules/utlis/JWTAuthServicer.service';
@Injectable()
export  class ExamPle implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    let req= context.switchToWs().getClient();
    let res= context.switchToWs().getClient();
    // const { authCookie: token } = req.cookies;
    return next.handle().pipe(
      tap(() => {
 console.log(req.headers)

      }))
  }
}
