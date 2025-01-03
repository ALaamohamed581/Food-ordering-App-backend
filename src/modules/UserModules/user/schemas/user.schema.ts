import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ type: [String], default: [] })
  address: string[];

  @Prop({ required: true })
  phoneNumber: string;
  @Prop()
  imageUrl: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Order' }], default: [] })
  previousOrders: Types.ObjectId[];

  @Prop({ required: true, default: 'user' })
  role: string;
  @Prop()
  image: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
