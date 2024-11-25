import {
  Body,
  Controller,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/creaeteAdmin.dto';
import { Request, Response } from 'express';
import { ApiCookieAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/gurds/authguard/AuthGuard.guard';
import { FilterPipe } from 'src/pipes/filterPipe';
import { UpdatePasswordDTO } from 'src/DTOs/update-password.dto';

@Controller('admins')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  createAdmin(@Body() body: CreateAdminDto, @Req() req: Request) {
    const url = `${req.get('host')}/admins/password`;

    return this.adminService.create(body, url);
  }
  @Post('signin')
  async signin(
    @Body() { email, password }: Partial<CreateAdminDto>,
    @Res() res: Response,
  ) {
    const { refreshToken, authToken } = await this.adminService.signIn(
      email,
      password,
    );
    return res
      .cookie('refCookie', refreshToken, {
        maxAge: 1000 * 60 * 60 * 24, // 24 hours
        secure: true,
      })
      .cookie('authCookie', authToken, {
        maxAge: 1000 * 60 * 15, // 15 minutes
        secure: true,
        httpOnly: true,
      })
      .status(200)
      .json({ message: 'sign successful' });
  }
  @ApiCookieAuth('authCookie')
  @UseGuards(AuthGuard('admin'))
  @Patch('password')
  updatedPassword(
    @Req() req: Request,

    @Body(new FilterPipe()) passowrdsData: UpdatePasswordDTO,
  ) {
    const id = req.userId;
    this.adminService.updatedPassword(id, passowrdsData);
    return 'password updated succefuly';
  }
}
