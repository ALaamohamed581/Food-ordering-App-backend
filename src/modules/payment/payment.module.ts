import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { MongooseModule } from '@nestjs/mongoose';

import { CartService } from '../cart/cart.service';
import { Cart, CartSchema } from '../cart/schams/cart.schema';
import {
  MenuItem,
  MenuItemSchema,
} from '../menuItems/schemas/menuItems.schmea';

@Module({
  controllers: [PaymentController],
  imports: [
    MongooseModule.forFeature([
      { name: Cart.name, schema: CartSchema },
      { name: MenuItem.name, schema: MenuItemSchema },
    ]),
  ],
  providers: [PaymentService, CartService],
})
export class PaymentModule {}
