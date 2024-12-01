import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { UpdatePasswordDTO } from '../../DTOs/update-password.dto';
import * as argon2 from 'argon2';
import { paginatedData, QueryString } from 'src/types/QueryString';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findAll({
    fields,
    limit,
    queryStr,
    skip,
    page,
    sort,
  }: QueryString): Promise<paginatedData> {
    const total = await this.userModel.find(queryStr).countDocuments();
    const numberOfPages = Math.ceil(total / limit);
    const users = await this.userModel
      .find(queryStr)
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .select(fields)
      .lean()
      .exec();
    return {
      data: users,
      numberOfPages,
      page,
    };
  }

  findOne(id: string): Promise<CreateUserDto> | Error {
    if (!id) {
      return new BadRequestException('please provide an id');
    }
    const exsitinguser = this.userModel.findById(id).lean();
    if (!exsitinguser) {
      return new NotFoundException('user dosent exsitis or have been deleted');
    }

    return exsitinguser;
  }

  update(email: string, updateUserDto: UpdateUserDto) {
    if (!email) {
      return new BadRequestException('please provide an id');
    }

    return this.userModel.findOne({ email }, updateUserDto, { new: true });
  }

  async updatedPassword(id: string, passwordsData: UpdatePasswordDTO) {
    const { Oldpassword, newPassword } = passwordsData;

    const exsitingUser = await this.userModel.findById(id);
    if (!exsitingUser) {
      return new NotFoundException('user not found');
    }
    if (!argon2.verify(exsitingUser.password, Oldpassword))
      return new BadRequestException(
        'wrong password please enter the coorect one',
      );
    exsitingUser.password = await argon2.hash(newPassword);
    await exsitingUser.save();
  }
}
