import { Controller, Get, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
// import { generateToken, doubleCsrfUtilities } from './config/csrfConfig';
import { Request, Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/CSRF')
  getHello(@Req() req: Request, @Res() res: Response) {
    // const csrfToken = generateToken(req, res, true, true); // Generates CSRF token

    res.json(' welcome'); // Send the token as part of the response for use in headers.
  }
}
