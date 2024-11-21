import {
  IsString,
  IsEmail,
  IsArray,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsArray()
  address?: string[];
  @IsOptional()
  @IsString()
  phoneNumber: string;

  @IsOptional()
  @IsArray()
  previousOrders?: Types.ObjectId[];

  @IsEnum(['user', 'admin'])
  role: string;
}
