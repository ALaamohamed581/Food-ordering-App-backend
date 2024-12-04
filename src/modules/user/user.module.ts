import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from './schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { FilterPipe } from 'src/pipes/filterPipe';
import { JWTAuthService } from 'src/modules/utlis/JWTAuthServicer.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],

  controllers: [UserController],
  providers: [UserService, FilterPipe, JwtService, JWTAuthService],
})
export class UserModule {}
