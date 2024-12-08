import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class UserChats extends Document {
  @Prop({})
  senderId: string;
  @Prop()
  reciverId: string;
  @Prop()
  chatId: string;
  @Prop()
  message: string;
}

export const UserChatsSchema = SchemaFactory.createForClass(UserChats);
