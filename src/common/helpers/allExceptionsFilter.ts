import { ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Request, Response } from 'express';
import { MongooseError } from 'mongoose';
import { MyLoggerService } from 'src/modules/my-logger/my-logger.service';

type ResponseObject = {
  statusCode: number;
  timeStamp: string;
  path: string;
  reponse: string | object;
};

export class AllExceptionFilter extends BaseExceptionFilter {
  private readonly logger = new MyLoggerService(AllExceptionFilter.name);
  catch(exception: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const myResponse: ResponseObject = {
      statusCode: 500,
      timeStamp: new Date().toISOString(),
      path: request.url,
      reponse: '',
    };
    if (exception instanceof HttpException) {
      myResponse.statusCode = exception.getStatus();
      myResponse.reponse = exception.getResponse();
    } else if (exception instanceof MongooseError) {
      myResponse.statusCode = 422;
      myResponse.reponse = exception.message.replaceAll(/\n/g, '');
    } else if (exception instanceof MongooseError) {
      myResponse.statusCode = 422;
      myResponse.reponse = exception.message.replaceAll(/\n/g, '');
    } else {
      myResponse.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      myResponse.reponse = 'INTERNAL SERVER ERROR'.toLowerCase();
    }

    response.status(myResponse.statusCode).json(myResponse);

    this.logger.error(myResponse.reponse, AllExceptionFilter.name);
    super.catch(exception, host);
  }
}
