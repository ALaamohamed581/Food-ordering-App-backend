import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { Cart } from './schams/cart.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { MenuItem } from 'src/modules/menu-itme/schemas/Resturant.schmea';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<Cart>,
    @InjectModel(MenuItem.name) private menuItemModel: Model<MenuItem>,
  ) {}

  async create(createCartDto: CreateCartDto) {
    const items = await Promise.all(
      createCartDto.cartItems.map(async (item) => {
        const menutitem = (await this.menuItemModel.findById(
          item.menuItmes,
        )) as MenuItem;
        return { menutitem, quantity: item.quantity };
      }),
    );

    const totalPrice = items.reduce((acc, item) => {
      return acc + item.menutitem.price * item.quantity;
    }, 0);
    const cart = this.cartModel.create(createCartDto);
    return { totalPrice, cart };
  }

  findOne(id: string) {
    return this.cartModel.findById(id);
  }

  async update(id: string, updateCartDto: any) {
    const existingCart = await this.cartModel.findById(id);
    if (!existingCart) {
      throw new NotFoundException('Cart not found');
    }

    const updatedItems = await Promise.all(
      updateCartDto.cartItems.map(async (item) => {
        const menuitem = await this.menuItemModel.findById(item.menuItmes);
        return { menuitem, quantity: item.quantity };
      }),
    );

    const totalPrice = updatedItems.reduce(
      (acc, item) => acc + item.menuItmes.price * item.quantity,
      0,
    );

    existingCart.cartItems = updateCartDto.cartItems;
    return { totalPrice, cart: updatedItems };
  }

  remove(id: string) {
    return this.cartModel.findOneAndDelete({ id });
  }
}
