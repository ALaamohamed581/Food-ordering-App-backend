import { IsArray, IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateAdminDto {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  password?: string;
  @IsOptional()
  @IsArray()
  permissions?: [string];
}
