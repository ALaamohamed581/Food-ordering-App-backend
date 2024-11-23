import {
  IsString,
  IsEmail,
  IsArray,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { Types } from 'mongoose';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsArray()
  address?: string[];

  @IsOptional()
  @IsString()
  phoneNumber?: string;
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsArray()
  previousOrders?: Types.ObjectId[];

  @IsOptional()
  @IsEnum(['user', 'admin'])
  role?: string;
}
