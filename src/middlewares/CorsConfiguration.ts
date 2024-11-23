import { Injectable, NestMiddleware } from '@nestjs/common';
import * as cors from 'cors';
const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
@Injectable()
export class CorsConfiguration implements NestMiddleware {
  use(req: any, res: any, next: (error?: Error | any) => void) {
    cors(corsOptions);
    next();
  }
}
