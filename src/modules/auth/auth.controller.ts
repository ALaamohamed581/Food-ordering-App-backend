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
import { ApiBody, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { accessToken } from 'src/Interceptores/AccessToken.intecptor copy';
import { JWTAuthService } from 'src/utlis/JWTAuthServicer.service';
import { jwtInterceptor } from 'src/Interceptores/jwtInterceptor.intecptor';
import { User } from '../user/schemas/user.schema';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwt: JWTAuthService,
  ) {}

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
  @UseInterceptors(
    jwtInterceptor({
      role: 'user',
    }),
  )
  async signIn(
    @Body() { email, password }: Partial<CreateUserDto>,

    @Req() req: Request,
  ) {
    const user: CreateUserDto = await this.authService.signIn(email, password);
    req.payload = user;

    return 'succes';
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

  // @UseGuards(RefrshGuradGuard('user'))
  // @Get('acces-token')
  // @ApiCookieAuth('refCookie')
  // @UseInterceptors(accessToken({ role: 'user' }))
  // async getAccessToken(@Req() request: Request, @Res() res: Response) {
  //   const id = request.payload._id as string;
  //   res.send(this.authService.getAuyhToken(id));
  // }
}
