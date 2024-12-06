import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserChatsDto } from './dto/create-user-chat.dto';
import { UpdateUserChatsDto } from './dto/update-user-chat.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UserChats } from './schema/userChats.schema';
import { Model } from 'mongoose';
import { paginatedData, QueryString } from '../../../types/QueryString';
 import { UserService } from '../user/user.service';

@Injectable()
export class UserChatsService {
  constructor(@InjectModel(UserChats.name) private readonly UserChats:Model<UserChats>
                 ,private readonly  userService:UserService) {
  }
  create(createUserChatDto: CreateUserChatsDto) {
    return this.UserChats.create(createUserChatDto);
  }

  async getAll({ fields, limit, queryStr, skip, page, sort }:QueryString):Promise<paginatedData> {
     const total = await this.UserChats.find(queryStr).countDocuments();
    const numberOfPages = Math.ceil(total / limit);
    const users = await this.UserChats
      .find(queryStr)
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .select(fields)
      .lean()
      .exec();
    return {
      data: users,
      numberOfPages,
      page,
    };
  }

 async getOne(id: string,ChatId:string) {
   await this.userService.findOne((id));
  const exsistingChat=await  this.UserChats.findById(ChatId)
   if(!exsistingChat)
     return new NotFoundException(`chat does not exist`);

   return exsistingChat
  }

  async updateOneChat(id: string,chatId:string ,updateUserChatDto: UpdateUserChatsDto) {
    await this.userService.findOne((id));
    const exsitingChat = await this.UserChats.findOneAndUpdate(
      {_id: chatId },
      updateUserChatDto,
    );
    if (!exsitingChat)
      return new NotFoundException(`chat does not exist`);

    return exsitingChat


  }

  remove(id: number) {
    return `This action removes a #${id} userChat`;
  }
}
