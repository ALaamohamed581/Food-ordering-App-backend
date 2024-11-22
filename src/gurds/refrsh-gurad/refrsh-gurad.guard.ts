import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RefrshGuradGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const {
      cookies: { refCookie },
    } = context.switchToHttp().getRequest();
    console.log(context.switchToHttp().getRequest().cookies);
    console.log(refCookie);
    if (refCookie) {
      return refCookie;
    } else return false;
  }
}
