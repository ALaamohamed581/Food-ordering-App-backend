import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartService.create(createCartDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(id);
  }
  // !! Find the cart by its ID
  // !! If the cart doesn't exist, throw a NotFoundException
  // !! Fetch each product by its ID and retain the quantity
  // !! Calculate the total price by summing up the price of each product multiplied by its quantity
  // !! Update the cart's items and total price
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: any) {
    return this.cartService.update(id, updateCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(id);
  }
}
