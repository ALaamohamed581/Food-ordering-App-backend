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

import { JWTAuthService } from 'src/utlis/JWTAuthServicer.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private UserModdle: Model<User>,
    private readonly jwtRes: JWTAuthService,
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
    return existingUser;
  }

  async getAuyhToken(id: string) {
    const user = await this.UserModdle.findById(id);

    if (!user) {
      return new NotFoundException('user has been deleted or dose not exsits');
    }

    return;
  }
}
