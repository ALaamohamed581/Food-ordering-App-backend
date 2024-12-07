import { DynamicModule, Module } from '@nestjs/common';
import { JWTAuthService } from './JWTAuthServicer.service';
import { Email } from './Email.service';
import { JwtService } from '@nestjs/jwt';
import { Payload } from 'src/types/JWTTypes';
declare module 'Express' {
  interface Request {
    payload: Payload;
    queryString: any;
  }
}
@Module({})
export class UtlisModule {
  static forRoot(): DynamicModule {
    return {
      module: UtlisModule,
      providers: [JWTAuthService, Email, JwtService],
      exports: [JWTAuthService, Email],
      global: true,
    };
  }
}
