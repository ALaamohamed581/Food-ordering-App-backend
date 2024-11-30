import { BadRequestException, Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { CartService } from '../order/cart/cart.service';
import { CreateCartDto } from '../order/cart/dto/create-cart.dto';
import { MenuItem } from '../menu-itme/schemas/Resturant.schmea';
import { InjectModel } from '@nestjs/mongoose';
import { Cart } from '../order/cart/schams/cart.schema';
import { Model } from 'mongoose';
const stripe = new Stripe(
  'sk_test_51PQzYsAeDMk9ovRaZd26FghchSru7BY0dkcnzsND3qy8W4bEMdy26CqFdxJu9jOWNhWvxRMLDaUGIpVy7qlTLvUZ00wdaBrLic',
);

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<Cart>,
    @InjectModel(MenuItem.name) private menuModel: Model<MenuItem>,
  ) {}

  async stripe(cartId: string) {
    // Fetch the cart
    const cart: CreateCartDto = await this.cartModel.findById(cartId);

    // Validate cart existence
    if (!cart) {
      throw new BadRequestException('Please create a cart');
    }

    // Fetch menu items and calculate total price
    const items = await Promise.all(
      cart.cartItems.map(async (item) => {
        const menuItem = await this.menuModel.findById(
          cart.cartItems.map((el) => el.menuItmes),
        );
        if (!menuItem) {
          throw new BadRequestException(
            `Menu item not found for ID: ${item.menuItmes}`,
          );
        }
        return { menuItem, quantity: item.quantity };
      }),
    );

    const lineItems = items.map((item) => ({
      price_data: {
        currency: 'egp',
        unit_amount: Math.round(item.menuItem.price * 100),
        product_data: {
          name: item.menuItem.name,
        },
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:8000/api/v1/success',
      cancel_url: 'http://localhost:8000/api/v1-swagger/cancel',
      client_reference_id: cart.userId.toString(),
    });

    return session;
  }
}
