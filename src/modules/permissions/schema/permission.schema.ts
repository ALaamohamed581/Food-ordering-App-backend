import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
export class Permission extends Document {
  @Prop({ required: true })
  permission: [string];
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Admin' })
  adminId?: string;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
