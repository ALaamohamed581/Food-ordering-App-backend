import { IsNotEmpty, IsArray } from 'class-validator';

export class CreateCartDto {
  @IsNotEmpty()
  userId: string;

  @IsArray()
  cartItems: {
    menuItmes: string;
    quantity: number;
  }[];
}
