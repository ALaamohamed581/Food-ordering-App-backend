import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  UseGuards,
  Query,
  Put,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request, Response } from 'express';

import { ApiCookieAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/gurds/authguard/AuthGuard.guard';
import { FilterPipe } from 'src/pipes/filterPipe';
import { UpdatePasswordDTO } from '../../DTOs/update-password.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllusers(@Query() qstr: string) {
    return this.userService.findAll(0, 5);
  }
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }
  @ApiCookieAuth('authCookie')
  @UseGuards(AuthGuard(process.env.AUTH_TOKEN_SECRET))
  @Put()
  Update(@Req() req: Request, @Body(new FilterPipe()) user: UpdateUserDto) {
    const id = req.userId;
    return this.userService.update(id, user);
  }
  @ApiCookieAuth('authCookie')
  @UseGuards(AuthGuard(process.env.AUTH_TOKEN_SECRET))
  @Patch('password')
  updatedPassword(
    @Req() req: Request,

    @Body(new FilterPipe()) passowrdsData: UpdatePasswordDTO,
  ) {
    const id = req.userId;
    this.userService.updatedPassword(id, passowrdsData);
    return 'password updated succefuly';
  }
}
