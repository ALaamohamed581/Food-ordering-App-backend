import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { config } from './config/swaggerConfig';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionFilter } from './helpers/alllExceptionsFilter';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser(process.env.COOKIE_SECRET));
  app.setGlobalPrefix('api/v1');
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionFilter(httpAdapter));
  app.useGlobalPipes(new ValidationPipe());
  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/v1', app, documentFactory);

  await app.listen(8000);
}
bootstrap();
