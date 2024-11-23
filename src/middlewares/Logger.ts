import {
  Injectable,
  Logger,
  LoggerService,
  NestMiddleware,
} from '@nestjs/common';
var currentdate = new Date();
var datetime =
  'Last Sync: ' +
  currentdate.getDate() +
  '/' +
  (currentdate.getMonth() + 1) +
  '/' +
  currentdate.getFullYear() +
  ' @ ' +
  currentdate.getHours() +
  ':' +
  currentdate.getMinutes() +
  ':' +
  currentdate.getSeconds();
@Injectable()
export class RequestLooger implements NestMiddleware {
  constructor(private readonly logger: Logger) {}
  use(req: any, res: any, next: (error?: Error | any) => void) {
    this.logger.log(
      `${req.method} Request to ${req.originalUrl} at ${datetime}`,
    );

    next();
  }
}
