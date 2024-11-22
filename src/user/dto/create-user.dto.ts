import { IsString, IsEmail, IsArray, IsOptional } from 'class-validator';
import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'John' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  lastName: string;

  @ApiProperty({ example: `john.${Math.random() * 1000}@example.com` })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  password: string;

  @ApiProperty({
    example: ['123 Street Name', 'City', 'Country'],
    required: false,
  })
  @IsOptional()
  @IsArray()
  address?: string[];

  @ApiProperty({ example: '123456789', required: false })
  @IsOptional()
  @IsString()
  phoneNumber: string;

  @ApiProperty({ example: ['60d0fe4f5311236168a109ca'], required: false })
  @IsOptional()
  @IsArray()
  previousOrders?: Types.ObjectId[];
}
