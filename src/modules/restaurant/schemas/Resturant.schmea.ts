import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { MenuItem } from 'src/modules/menu-itme/schemas/Resturant.schmea';

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

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true })
  cuisine: string;

  @Prop({ type: mongoose.Schema.ObjectId, ref: 'meuItem' })
  menuItems: MenuItem[];
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
