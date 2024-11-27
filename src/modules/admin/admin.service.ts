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
import { JWTAuthService } from '../../utlis/JWTAuthServicer.service';
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
  async updatedPassword(id: string, passwordsData: UpdatePasswordDTO) {
    let { Oldpassword, newPassword } = passwordsData;

    const exsitingUser = await this.adminModel.findById(id);
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
}
