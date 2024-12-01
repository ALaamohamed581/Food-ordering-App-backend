import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QueryString } from 'src/types/QueryString';
import { Permission } from './schema/permission.schema';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectModel(Permission.name) private permissionsModel: Model<Permission>,
  ) {}

  create(createPermissionDto: CreatePermissionDto) {
    return this.permissionsModel.create(createPermissionDto);
  }

  async findAll({
    fields,
    limit,
    queryStr,
    skip,
    sort,
    page,
  }: QueryString): Promise<any> {
    const total = await this.permissionsModel.find(queryStr).countDocuments();
    const numberOfPages = Math.ceil(total / limit);
    const permaissions = this.permissionsModel
      .find(queryStr)
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .select(fields)
      .lean()
      .exec();
    return {
      data: permaissions,
      numberOfPages,
      page,
    };
  }

  findOne(id: string) {
    return this.permissionsModel.findById(id);
  }

  async update(id: string, updatePermissionDto: UpdatePermissionDto) {
    const exsisingperms: UpdatePermissionDto =
      await this.permissionsModel.findById(id);
    if (exsisingperms.permission.length > 0) {
      return this.permissionsModel.findByIdAndUpdate(id, updatePermissionDto);
    }
    return this.permissionsModel.findByIdAndUpdate(id, {
      $push: { Permission },
    });
  }

  async remove(id: string) {
    return await this.permissionsModel.findOneAndDelete({ id });
  }
}
