import {
  Controller,
  Post,
  Body,
  Res,
  Req,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';

import { AuthService } from '../auth/auth.service';
import { Request, Response } from 'express';
import { ApiOperation } from '@nestjs/swagger';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { JWTAuthService } from 'src/modules/utlis/JWTAuthServicer.service';

import { FileInterceptor } from '@nestjs/platform-express';
import { Santiztion } from 'src/common/pipes/sanitiztaion.pip';
import { ImagesPipe } from 'src/common/pipes/images.pipe';
import { SignIn } from 'src/common/Interceptores/signin.intecptor';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwt: JWTAuthService,
  ) {}

  @ApiOperation({ summary: 'signs up and creats new user ' })
  @Post('/signup')
  @UseInterceptors(FileInterceptor('image'))
  signUp(
    @Body(new Santiztion()) createUserDto: CreateUserDto,
    @UploadedFile(new ImagesPipe()) imageUrl: string,
  ) {
    createUserDto.image = imageUrl || '';
    return this.authService.signUp(createUserDto);
  }
  @ApiOperation({
    summary:
      'signs in and generate auth token 15 mins long and a refresh token ',
  })
  @Post('/signin')
  @UseInterceptors(
    SignIn({
      role: 'user',
    }),
  )
  async signIn(
    @Body() { email, password }: Partial<CreateUserDto>,

    @Req() req: Request,
  ) {
    const user = await this.authService.signIn(email, password);
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
