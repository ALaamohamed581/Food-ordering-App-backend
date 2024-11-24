import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user/schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from '../user/dto/create-user.dto';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private UserModdle: Model<User>,
    private readonly jwt: JwtService,
  ) {}

  async signUp(user: CreateUserDto) {
    const existingUser = await this.UserModdle.findOne({ email: user.email });
    if (existingUser)
      throw new BadRequestException('This email already exists');

    user.password = await argon2.hash(user.password);

    const newUser = await this.UserModdle.create(user);

    return newUser;
  }
  async signIn(email: string, password: string) {
    const existingUser = await this.UserModdle.findOne({ email: email });
    if (!existingUser)
      throw new BadRequestException('This email dosent exsits');

    if (
      !existingUser ||
      !(await argon2.verify(existingUser.password, password))
    ) {
      throw new UnauthorizedException('wrong mail or password');
    }
    const refreshToken = this.jwt.sign(
      { email: existingUser.email },
      {
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: '1d',
      },
    );
    const authToken = this.jwt.sign(
      { existingUser },
      { secret: process.env.AUTH_TOKEN_SECRET, expiresIn: '15m' },
    );

    return { refreshToken, authToken };
  }

  async getAuyhToken(refreshtoken: string) {
    if (
      !this.jwt.verify(refreshtoken, {
        secret: process.env.REFRESH_TOKEN_SECRET,
      })
    ) {
      return new UnauthorizedException('please sign in first');
    }
    let { email } = await this.jwt.decode(refreshtoken);
    const user = await this.UserModdle.findOne({ email });

    if (!user) {
      return new NotFoundException('user has been deleted or dose not exsits');
    }
    const authToken = this.jwt.sign(
      { user },
      { secret: process.env.AUTH_TOKEN_SECRET, expiresIn: '15m' },
    );
    return authToken;
  }
}
