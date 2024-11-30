import { IsNotEmpty, IsArray, IsNumber } from 'class-validator';
import { Types } from 'mongoose';

export class CreateCartDto {
  @IsNotEmpty()
  userId: string;

  @IsArray()
  cartItems: {
    menuItmes: string;
    quantity: number;
  }[];
}
