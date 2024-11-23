import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schena';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findAll(skip: number, limit: number): Promise<CreateUserDto[]> {
    return this.userModel.find().lean().skip(skip).limit(limit).exec();
  }

  findOne(id: string): Promise<CreateUserDto> | Error {
    if (!id) {
      return new BadRequestException('please provide an id');
    }
    let exsitinguser = this.userModel.findById(id).lean();
    if (!exsitinguser) {
      return new NotFoundException('user dosent exsitis or have been deleted');
    }

    return exsitinguser;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    if (!id) {
      return new BadRequestException('please provide an id');
    }
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  }
}
