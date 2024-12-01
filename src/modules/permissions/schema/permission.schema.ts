import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Permission extends Document {
  @Prop({ required: true })
  permission: [string];
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
