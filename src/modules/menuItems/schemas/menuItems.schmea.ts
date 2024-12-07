import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type menuItem = Document;

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
  @Prop()
  image: string;
}

export const MenuItemSchema = SchemaFactory.createForClass(MenuItem);
