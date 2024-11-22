import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Res,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { RefrshGuradGuard } from 'src/gurds/refrsh-gurad/refrsh-gurad.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
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
  @ApiCreatedResponse()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'alaa.eltawwyb@hotmail.com' },
        password: { type: 'string', example: '123123123' },
      },
    },
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
        maxAge: 1000 * 60 * 60 * 24,
        secure: true,
      })
      .cookie('authCookie', authToken, {
        maxAge: 1000 * 60 * 15,
        secure: true,
        httpOnly: true,
      })
      .status(200)
      .json({ message: 'Sign-in successful' });
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

  @UseGuards(RefrshGuradGuard)
  @Get('acces-token')
  @ApiCookieAuth('refCookie')
  async getAccessToken(@Req() request: Request, @Res() res: Response) {
    const {
      cookies: { refCookie: refrshToken },
    } = request;

    const authToken = await this.authService.getAuyhToken(refrshToken);
    res
      .cookie('authCookie', authToken, {
        maxAge: 1000 * 60 * 15,
        secure: true,
        httpOnly: true,
      })
      .status(200)
      .json({ message: 'new token accqureid' });
  }
}
