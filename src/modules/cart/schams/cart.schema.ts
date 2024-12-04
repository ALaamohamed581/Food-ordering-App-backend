import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Cart extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  userId: string;
  @Prop()
  cartItems: [
    {
      menuItem: { type: MongooseSchema.Types.ObjectId; ref: 'MenuItem' };
      quantity: number;
    },
  ];
}

export const CartSchema = SchemaFactory.createForClass(Cart);
