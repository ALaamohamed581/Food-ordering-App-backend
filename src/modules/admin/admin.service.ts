import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { Admin } from './schemas/admin.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateAdminDto } from './dto/creaeteAdmin.dto';
import { Email } from 'src/utlis/Email.service';
import * as argon2 from 'argon2';
import { UpdatePasswordDTO } from 'src/DTOs/update-password.dto';
@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<Admin>,
    private readonly email: Email,
  ) {}

  async create(body: CreateAdminDto, url: string) {
    body.password = `changeMe@${body.firstName}`;
    this.email.setRecipientData(body, url).sendAdminWelcome();
    return this.adminModel.create(body);
  }
  async signIn(email: string, password: string) {
    const existingUser = await this.adminModel.findOne({ email: email });
    if (!existingUser)
      throw new BadRequestException('This email dosent exsits');
    if (
      !existingUser ||
      !(
        (existingUser.password.startsWith('$') &&
          (await argon2.verify(existingUser.password, password))) ||
        (!existingUser.password.startsWith('$') &&
          existingUser.password === password)
      )
    ) {
      throw new UnauthorizedException('Wrong email or password');
    }

    return existingUser;
  }
  async updatedPassword(email: string, passwordsData: UpdatePasswordDTO) {
    const { Oldpassword, newPassword } = passwordsData;
    console.log();
    const exsitingUser = await this.adminModel.findOne({ email });
    if (!exsitingUser) {
      return new NotFoundException('user not found');
    }
    if (
      !exsitingUser ||
      !(
        (exsitingUser.password.startsWith('$') &&
          (await argon2.verify(exsitingUser.password, Oldpassword))) ||
        (!exsitingUser.password.startsWith('$') &&
          exsitingUser.password === Oldpassword)
      )
    ) {
      throw new UnauthorizedException('Wrong email or password');
    }

    exsitingUser.password = await argon2.hash(newPassword);
    await exsitingUser.save();
  }
  async getAll({ queryStr, limit, sort, fields, skip, page }: any) {
    const total = await this.adminModel.find(queryStr).countDocuments();
    const numberOfPages = total / limit;
    console.log(queryStr);
    console.log(Math.ceil(numberOfPages));
    const resturants: CreateAdminDto[] = await this.adminModel
      .find(queryStr)
      .skip(skip)

      .limit(limit)
      .sort(sort)
      .select(fields)
      .lean()

      .exec();
    return {
      data: resturants,
      numberOfPages,
      page,
    };
  }
}
