import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/creaeteAdmin.dto';
import { Request } from 'express';
import { ApiCookieAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/gurds/authguard/authGuard.guard';
import { FilterPipe } from 'src/pipes/filterPipe';
import { UpdatePasswordDto } from 'src/dtos/updatePassword.dto';
import { SignIn } from 'src/Interceptores/signin.intecptor';
import { Santiztion } from 'src/pipes/sanitiztaion.pip';
import { PaginationPipe } from 'src/pipes/pagination.pipe';
import { QueryString } from 'src/types/QueryString';
import { Admin } from './schemas/admin.schema';
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
    const admin: CreateAdminDto | Error = await this.adminService.signIn(
      email,
      password,
    );
    req.payload = admin as Admin;
    return 'sign in ';
  }
  @ApiCookieAuth('authCookie')
  @UseGuards(AuthGuard('admin'))
  @Patch('password')
  updatedPassword(
    @Req() req: Request,

    @Body(new FilterPipe()) passowrdsData: UpdatePasswordDto,
  ) {
    const email = req.payload.email;

    this.adminService.updatedPassword(email, passowrdsData);
    return 'password updated succefuly';
  }
  @Get()
  async getAll(
    @Query(new PaginationPipe())
    { queryStr, limit, sort, fields, skip, page }: QueryString,
  ) {
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
