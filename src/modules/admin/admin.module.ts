import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Admin, AdminSchema } from './schemas/admin.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Email } from 'src/utlis/Email.service';
import { JwtService } from '@nestjs/jwt';
import { AdminController } from './admin.controller';
import { JWTAuthService } from 'src/utlis/JWTAuthServicer.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
  ],
  controllers: [AdminController],
  providers: [AdminService, Email, JwtService, JWTAuthService],
})
export class AdminModule {}
