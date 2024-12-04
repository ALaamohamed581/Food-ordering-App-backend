import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { Permission, PermissionSchema } from './schema/permission.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JWTAuthService } from '../utlis/JWTAuthServicer.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Permission.name, schema: PermissionSchema },
    ]),
  ],
  controllers: [PermissionsController],
  providers: [PermissionsService, JWTAuthService, JwtService],
})
export class PermissionsModule {}
