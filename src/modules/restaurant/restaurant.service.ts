import { Injectable } from '@nestjs/common';
import { Restaurant } from './schemas/Resturant.schmea';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateRestaurntDto } from './dtos/CreateRestaurnt.dto';
@Injectable()
export class RestaurantService {
  constructor(
    @InjectModel(Restaurant.name) private restaurantModel: Model<Restaurant>,
  ) {}

  create(restaurant: CreateRestaurntDto) {
    return this.restaurantModel.create(restaurant);
  }

  async getAll({ queryStr, limit, sort, fields, skip, page }: any) {
    const total = await this.restaurantModel.find(queryStr).countDocuments();
    const numberOfPages = Math.ceil(total / limit);

    const resturants: CreateRestaurntDto[] = await this.restaurantModel
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
  async getOne(id: string) {
    return await this.restaurantModel.findById(id).sort().lean().exec();
  }
  async addMenuItem(id: string, addMenuItem: any): Promise<Restaurant> {
    return this.restaurantModel.findByIdAndUpdate(
      id,
      { $push: { menuItems: addMenuItem } },
      { new: true, useFindAndModify: false },
    );
  }
}
