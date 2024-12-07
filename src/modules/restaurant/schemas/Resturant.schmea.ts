import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { MenuItem } from 'src/modules/menuItems/schemas/menuItems.schmea';

export type RestaurantDocument = Document;

@Schema()
export class Restaurant {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  email: string;
  @Prop()
  image: string;

  @Prop({})
  phoneNumber: string;

  @Prop({})
  cuisine: string;

  @Prop({ type: mongoose.Schema.ObjectId, ref: 'MenuItem' })
  menuItems: MenuItem[];
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
