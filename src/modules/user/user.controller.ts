import {
  Controller,
  Get,
  Body,
  Param,
  UseGuards,
  Query,
  Put,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request } from 'express';

import { ApiCookieAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/gurds/authguard/authGuard.guard';
import { FilterPipe } from 'src/pipes/filterPipe';
import { PaginationPipe } from 'src/pipes/Pagination.pipe';
import { paginatedData, QueryString } from 'src/types/QueryString';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
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
  // updatedPassword(@Body(new FilterPipe()) passowrdsData: UpdatePasswordDTO) {
  //   return 'password updated succefuly';
  // }
}
