import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { ObjectSchema } from 'yup';

export type RestaurantDocument = Restaurant & Document;

@Schema()
export class MenuItem {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  ingredients: string[];

  @Prop()
  rating: number;
}

export const MenuItemSchema = SchemaFactory.createForClass(MenuItem);

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

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true })
  cuisine: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' })
  menuItems: MenuItem[];
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
