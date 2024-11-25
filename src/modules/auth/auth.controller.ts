import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { AuthService } from '../auth/auth.service';
import { Request, Response } from 'express';
import { RefrshGuradGuard } from 'src/gurds/refrsh-gurad/refrsh-gurad.guard';
import {
  ApiBody,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { accessToken } from 'src/Interceptores/AccessToken.intecptor';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'signs up and creats new user ' })
  @ApiCreatedResponse()
  @ApiBody({ type: CreateUserDto })
  @Post('/signup')
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }
  @ApiOperation({
    summary:
      'signs in and generate auth token 15 mins long and a refresh token ',
  })
  @Post('/signin')
  async signIn(
    @Body() { email, password }: Partial<CreateUserDto>,
    @Res() res: Response,
  ) {
    const { refreshToken, authToken } = await this.authService.signIn(
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

  @Post('/signout')
  async signOut(@Res() res: Response) {
    return res
      .cookie('refCookie', '', {
        maxAge: 0,
        secure: true,
        httpOnly: true,
        signed: true,
      })
      .cookie('authCookie', '', {
        maxAge: 0,
        secure: true,
        httpOnly: true,
        signed: true,
      })
      .status(200)
      .json({ message: 'Sign-out successful' });
  }

  @UseGuards(RefrshGuradGuard('user'))
  @Get('acces-token')
  @ApiCookieAuth('refCookie')
  @UseInterceptors(accessToken({ role: 'user' }))
  async getAccessToken(@Req() request: Request, @Res() res: Response) {
    const id = request.userId;
    res.send(this.authService.getAuyhToken(id));
  }
}
