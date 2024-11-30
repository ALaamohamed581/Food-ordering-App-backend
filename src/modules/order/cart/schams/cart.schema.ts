import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Cart extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  userId: MongooseSchema.Types.ObjectId;

  @Prop({
    type: [
      {
        menuItmes: {
          type: MongooseSchema.Types.ObjectId,
          ref: 'menuItem',
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
    required: true,
  })
  cartItems: { menuItem: MongooseSchema.Types.ObjectId; quantity: number }[];
}

export const CartSchema = SchemaFactory.createForClass(Cart);
