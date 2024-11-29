import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { MenuItem } from '../schemas/Resturant.schmea';
export class CreateRestaurntDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  address: string;
  @IsOptional()
  @IsString()
  email: string;
  @IsOptional()
  @IsString()
  phoneNumber: string;
  @IsOptional()
  @IsString()
  image: string;
  @IsOptional()
  @IsString()
  cuisine: string;
  @IsOptional()
  @IsArray()
  menuItems: MenuItem[];
}