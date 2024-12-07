import { Controller, Get, Req, Res } from '@nestjs/common';

import { Request, Response } from 'express';
import { generateToken } from './config/csrf.config';

@Controller()
export class AppController {
  constructor() {}

  @Get('/CSRF')
  getHello(@Req() req: Request, @Res() res: Response) {
    const csrfToken = generateToken(req, res, true, true);
    return csrfToken;
    res.json(' welcome');
  }
}
