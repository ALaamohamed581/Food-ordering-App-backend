import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

import { FilterPipe } from 'src/pipes/filterPipe';
import { UserChatsModule } from '../user-chats/user-chats.module';

import { SharedSchemasModule } from '../shardeSchema.modile';

@Module({
  imports: [
    SharedSchemasModule,
    UserChatsModule,
    ],
  controllers: [UserController],
  exports: [UserService],
  providers: [UserService, FilterPipe],
})
export class UserModule {}
