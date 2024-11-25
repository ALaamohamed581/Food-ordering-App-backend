import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from './schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Paggination } from 'src/helpers/Paggination';
import { FilterPipe } from 'src/pipes/filterPipe';
import { JWTAuthService } from 'src/utils/JWTAuthServicer.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],

  controllers: [UserController],
  providers: [UserService, FilterPipe, JwtService, JWTAuthService],
})
export class UserModule {}
