import {
  Controller,
  Get,
  Body,
  Param,
  UseGuards,
  Query,
  Put,
  Req,
  Post,
  UseInterceptors,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request } from 'express';

import { ApiCookieAuth } from '@nestjs/swagger';

import { paginatedData, QueryString } from 'src/types/QueryString';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserChatsService } from '../user-chats/user-chats.service';
import { CreateUserChatsDto } from '../user-chats/dto/create-user-chat.dto';
import { PaginationPipe } from 'src/common/pipes/pagination.pipe';
import { AuthGuard } from 'src/common/gurds/authguard/authGuard.guard';
import { FilterPipe } from 'src/common/pipes/filterPipe';
@UseInterceptors(CacheInterceptor)
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly UserChate: UserChatsService,
  ) {}

  @Get()
  @UseInterceptors(FileInterceptor('image'))
  async getAllusers(
    @Query(new PaginationPipe())
    { fields, limit, queryStr, skip, page, sort }: QueryString,
  ) {
    const data: paginatedData = await this.userService.findAll({
      fields,
      limit,
      queryStr,
      skip,
      page,
      sort,
    });
    return data;
  }
  @Get(':id')
  getOne(@Param('id') id: string) {
    console.log(id);
    return this.userService.findOne(id);
  }
  @ApiCookieAuth('authCookie')
  @UseGuards(AuthGuard(process.env.AUTH_TOKEN_SECRET))
  @Put()
  Update(@Req() req: Request, @Body(new FilterPipe()) user: UpdateUserDto) {
    const email = req.payload.email as string;
    return this.userService.update(email, user);
  }
  // @ApiCookieAuth('authCookie')
  // @UseGuards(AuthGuard(process.env.AUTH_TOKEN_SECRET))
  // @Patch('password')
  // updatedPassword(@Body(new FilterPipe()) passowrdsData: UpdatePasswordDto) {
  //   return 'password updated succefuly';
  // }

  @Post('/user-chats')
  create(@Body() CreateUserChatsDto: CreateUserChatsDto) {
    return this.UserChate.create(CreateUserChatsDto);
  }
  @Get('/user-chats')
  gerAllChats(
    @Query(new PaginationPipe())
    { fields, limit, queryStr, skip, page, sort }: QueryString,
  ) {
    return this.UserChate.getAll({ fields, limit, queryStr, skip, page, sort });
  }
  @UseGuards(AuthGuard('user'))
  @Get(':chatId/user-chats')
  async getOneChat(@Req() req: Request, @Param('chatId') chatId: string) {
    return this.UserChate.getOne(req.payload._id as string, chatId);
  }
  @UseGuards(AuthGuard('user'))
  @Patch(':chatId/user-chats')
  async updateOneChat(@Req() req: Request, @Param('chatId') chatId: string) {
    return this.UserChate.getOne(req.payload._id as string, chatId);
  }
}
