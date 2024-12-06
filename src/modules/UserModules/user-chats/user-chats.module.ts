import { forwardRef, Module } from '@nestjs/common';
import { UserChatsService } from './user-chats.service';

import { SharedSchemasModule } from '../shardeSchema.modile';
import { UserModule } from '../user/user.module';

@Module({

  providers: [UserChatsService],
  exports: [UserChatsService],
  imports:[SharedSchemasModule,forwardRef(() => UserModule)]
})
export class UserChatsModule {}
