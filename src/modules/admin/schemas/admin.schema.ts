import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({})
export class Admin extends Document {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop({ required: true, enum: ['admin', 'superAdmin'], default: 'admin' })
  role: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
