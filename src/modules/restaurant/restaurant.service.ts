import { Injectable } from '@nestjs/common';
import { Restaurant } from './schemas/Resturant.schmea';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateRestaurntDto } from './dtos/create-restaurant.dto';
import { paginatedData, QueryString } from 'src/types/QueryString';
import { MenuItem } from '../menu-itme/schemas/Resturant.schmea';
@Injectable()
export class RestaurantService {
  constructor(
    @InjectModel(Restaurant.name) private restaurantModel: Model<Restaurant>,
    @InjectModel(MenuItem.name) private MenuItem: Model<MenuItem>,
  ) {}

  create(restaurant: CreateRestaurntDto) {
    return this.restaurantModel.create(restaurant);
  }

  async getAll({
    queryStr,
    limit,
    sort,
    fields,
    skip,
    page,
  }: QueryString): Promise<paginatedData> {
    const total = await this.restaurantModel
      .find(queryStr)
      .countDocuments()
      .exec();
    const numberOfPages = Math.ceil(total / limit);

    const resturants: CreateRestaurntDto[] = await this.restaurantModel
      .find(queryStr)
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .select(fields)
      .populate('menuItems')
      .lean()
      .exec();
    return {
      data: resturants,
      numberOfPages,
      page: page,
    };
  }
  async getOne(id: string) {
    return await this.restaurantModel.findOne({ id }).sort().lean().exec();
  }
  async addMenuItem(id: string, addMenuItem: any): Promise<Restaurant> {
    return this.restaurantModel.findByIdAndUpdate(
      id,
      { $push: { menuItems: addMenuItem } },
      { new: true, useFindAndModify: false },
    );
  }
}
