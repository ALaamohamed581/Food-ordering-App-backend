import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, CartSchema } from '../order/cart/schams/cart.schema';
import { CartService } from '../order/cart/cart.service';
import {
  MenuItem,
  MenuItemSchema,
} from '../menu-itme/schemas/Resturant.schmea';

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
