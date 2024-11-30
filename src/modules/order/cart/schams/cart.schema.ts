import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Cart extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  userId: string;

  @Prop({
    type: [
      {
        menuItmes: {
          type: mongoose.Schema.Types.ObjectId,
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
