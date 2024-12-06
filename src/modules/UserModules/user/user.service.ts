import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as argon2 from 'argon2';
import { paginatedData, QueryString } from 'src/types/QueryString';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDTO } from '../../../DTOs/update-password.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly i18n: I18nService,
  ) {}

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

  async findOne(id: string): Promise<CreateUserDto | Error> {
    if (!id) {
      return new BadRequestException('please provide an id');
    }
    const exsitinguser = (await this.userModel
      .findById({ _id: id })
      .select('-password')) as CreateUserDto;

    if (!exsitinguser) {
      return new NotFoundException(
        this.i18n.t('test.NotFound', { lang: I18nContext.current().lang }),
      );
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
