import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/creaeteAdmin.dto';
import { Request, Response } from 'express';
import { ApiCookieAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/gurds/authguard/AuthGuard.guard';
import { FilterPipe } from 'src/pipes/filterPipe';
import { UpdatePasswordDTO } from 'src/DTOs/update-password.dto';
import { SignIn } from 'src/Interceptores/Signin.intecptor';
import { Santiztion } from 'src/pipes/sanitiztaion.pip';
@Controller('admins')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  createAdmin(
    @Body(new Santiztion()) body: CreateAdminDto,
    @Req() req: Request,
  ) {
    const url = `${req.get('host')}/admins/password`;

    return this.adminService.create(body, url);
  }
  @Post('/signin')
  @UseInterceptors(
    SignIn({
      role: 'admin',
    }),
  )
  async signin(
    @Body() { email, password }: Partial<CreateAdminDto>,
    @Req() req: Request,
  ) {
    const admin: CreateAdminDto = await this.adminService.signIn(
      email,
      password,
    );
    req.payload = admin;
    return 'sign in ';
  }
  @ApiCookieAuth('authCookie')
  @UseGuards(AuthGuard('admin'))
  @Patch('password')
  updatedPassword(
    @Req() req: Request,

    @Body(new FilterPipe()) passowrdsData: UpdatePasswordDTO,
  ) {
    const email = req.payload.email;

    this.adminService.updatedPassword(email, passowrdsData);
    return 'password updated succefuly';
  }
  @Get()
  async getAll(@Req() req: Request) {
    const { queryStr, limit, sort, fields, skip, page } = req.queryString;
    return await this.adminService.getAll({
      queryStr,
      limit,
      sort,
      fields,
      skip,
      page,
    });
  }
}
