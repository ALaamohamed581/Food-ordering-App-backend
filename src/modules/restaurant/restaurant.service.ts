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
  async addMenuItem(id: string, addMenuItem: any): Promise<Restaurant> {
    return this.restaurantModel.findByIdAndUpdate(
      id,
      { $push: { menuItems: addMenuItem } },
      { new: true, useFindAndModify: false },
    );
  }
}
