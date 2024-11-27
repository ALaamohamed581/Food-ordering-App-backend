import {
  Body,
  Controller,
  Patch,
  Post,
  Req,
  Res,
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
import { jwtInterceptor } from 'src/Interceptores/jwtInterceptor.intecptor';
import { Admin } from './schemas/admin.schema';

@Controller('admins')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  createAdmin(@Body() body: CreateAdminDto, @Req() req: Request) {
    const url = `${req.get('host')}/admins/password`;

    return this.adminService.create(body, url);
  }
  @Post('/signin')
  @UseInterceptors(
    jwtInterceptor({
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

    console.log(admin, 'the admin');
    console.log(req.payload, 'the ');
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
}
