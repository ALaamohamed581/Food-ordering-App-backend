import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  UserChats,
  UserChatsSchema,
} from './user-chats/schema/userChats.schema';
import { User, UserSchema } from './user/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: UserChats.name, schema: UserChatsSchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class SharedSchemasModule {}
