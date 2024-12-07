import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { MenuItem } from 'src/modules/menuItems/schemas/menuItems.schmea';
export class CreateRestaurntDto {
  @IsOptional()
  @IsOptional()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  address: string;
  @IsOptional()
  @IsOptional()
  @IsString()
  email: string;
  @IsOptional()
  @IsString()
  @IsOptional()
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
