import { IsNotEmpty, IsArray, IsNumber } from 'class-validator';
import { Types } from 'mongoose';

export class CreateCartDto {
  @IsNotEmpty()
  userId: Types.ObjectId;

  @IsArray()
  cartItems: {
    menuItmes: Types.ObjectId;
    quantity: number;
  }[];
}
