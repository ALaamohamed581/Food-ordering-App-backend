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
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from '../auth/auth.service';
import { Request, Response } from 'express';

import {
  ApiBearerAuth,
  ApiBody,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/gurds/authguard/AuthGuard.guard';
import { FilterPipe } from 'src/pipes/filterPipe';
import { UpdatePasswordDTO } from './dto/update-password.dto';

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
  @UseGuards(AuthGuard)
  @Put()
  Update(@Req() req: Request, @Body(new FilterPipe()) user: UpdateUserDto) {
    const id = req.userId;
    return this.userService.update(id, user);
  }
  @UseGuards(AuthGuard)
  @Patch('password')
  updatedPassword(
    @Req() req: Request,

    @Body(new FilterPipe()) passowrdsData: UpdatePasswordDTO,
  ) {
    const id = req.userId;
    console.log(passowrdsData);
    this.userService.updatedPassword(id, passowrdsData);
    return 'password updated succefuly';
  }
}
