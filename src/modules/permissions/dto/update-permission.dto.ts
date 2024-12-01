import { PartialType } from '@nestjs/swagger';
import { CreatePermissionDto } from './create-permission.dto';
import { IsArray, IsString, IsOptional } from 'class-validator';

export class UpdatePermissionDto extends PartialType(CreatePermissionDto) {
  @IsArray()
  @IsOptional()
  permission: string[];
  @IsOptional()
  @IsString()
  AdminId: string;
}
