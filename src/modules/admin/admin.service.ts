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
import { Email } from 'src/modules/utlis/Email.service';
import * as argon2 from 'argon2';
import { UpdatePasswordDto } from 'src/common/dtos/updatePassword.dto';
import { I18nContext, I18nService } from 'nestjs-i18n';
@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<Admin>,
    private readonly email: Email,
    private readonly i18nService: I18nService,
  ) {}

  async create(body: CreateAdminDto, url: string) {
    body.password = `changeMe@${body.firstName}`;
    this.email.setRecipientData(body, url).sendAdminWelcome();
    return this.adminModel.create(body);
  }
  async signIn(email: string, password: string) {
    const exsisntADmin = await this.adminModel
      .findOne({
        email,
      })
      .select('+password');
    if (!exsisntADmin) {
      return new BadRequestException(
        this.i18nService.t('errors.email', {
          lang: I18nContext.current().lang,
        }),
      );
    }
    console.log(exsisntADmin);
    if (
      !exsisntADmin ||
      !(
        (exsisntADmin.password.startsWith('$') &&
          (await argon2.verify(exsisntADmin.password, password))) ||
        (!exsisntADmin.password.startsWith('$') &&
          exsisntADmin.password === password)
      )
    ) {
      return new UnauthorizedException(
        this.i18nService.t('errors.emailPassword', {
          lang: I18nContext.current().lang,
        }),
      );
    }

    return exsisntADmin;
  }
  async updatedPassword(email: string, passwordsData: UpdatePasswordDto) {
    const { Oldpassword, newPassword } = passwordsData;
    console.log();
    const exsitingUser = await this.adminModel
      .findOne({ email })
      .select('+password');
    if (!exsitingUser) {
      return new NotFoundException(
        this.i18nService.t('errors.admin', {
          lang: I18nContext.current().lang,
        }),
      );
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
      throw new UnauthorizedException(
        this.i18nService.t('errors.password', {
          lang: I18nContext.current().lang,
        }),
      );
    }

    exsitingUser.password = await argon2.hash(newPassword);
    await exsitingUser.save();
  }
  async getAll({ queryStr, limit, sort, fields, skip, page }: any) {
    const total = await this.adminModel.find(queryStr).countDocuments();
    const numberOfPages = Math.ceil(total / limit);

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
