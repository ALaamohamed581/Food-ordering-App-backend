import { Module } from '@nestjs/common';

import { User, UserSchema } from '../user/schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtService } from '@nestjs/jwt';
import { UtlisModule } from 'src/utlis/utlis.module';

@Module({
  imports: [
    UtlisModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
})
export class AuthModule {}
