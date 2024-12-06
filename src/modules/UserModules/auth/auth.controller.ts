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
import { SignIn } from 'src/Interceptores/Signin.intecptor';
import { Santiztion } from 'src/pipes/sanitiztaion.pip';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImagesPipe } from 'src/pipes/images.pipe';

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
