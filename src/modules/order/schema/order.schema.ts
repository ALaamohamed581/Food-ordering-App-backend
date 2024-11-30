import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Order extends Document {
  @Prop({ required: true })
  order: string;

  @Prop({ required: true })
  cartId: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  ETA: Date;

  @Prop({ required: true })
  courier: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
