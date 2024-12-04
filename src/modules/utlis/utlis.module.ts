import { Module } from '@nestjs/common';
import { JWTAuthService } from './JWTAuthServicer.service';
import { Email } from './Email.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [JWTAuthService, Email, JwtService],
  exports: [JWTAuthService, Email],
})
export class UtlisModule {}
