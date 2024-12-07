import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QueryString } from 'src/types/QueryString';
import { CreateMenuItemDto } from './dto/menuItem.dto';
import { MenuItem } from './schemas/menuItems.schmea';
import { Restaurant } from '../restaurant/schemas/Resturant.schmea';

@Injectable()
export class MenuItmeService {
  constructor(
    @InjectModel(MenuItem.name) private menuItemModel: Model<MenuItem>,
    @InjectModel(Restaurant.name) private restaurantModel: Model<Restaurant>,
  ) {}
  create(meuitem) {
    return this.menuItemModel.create(meuitem);
  }
  async getAll({ fields, limit, queryStr, skip, sort, page }: QueryString) {
    const total = await this.menuItemModel.find(queryStr).countDocuments();
    const numberOfPages = Math.ceil(total / limit);
    const menuItems: CreateMenuItemDto[] = await this.menuItemModel
      .find(queryStr)
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .select(fields)
      .lean()
      .exec();
    return {
      data: menuItems,
      numberOfPages,
      page,
    };
  }
  getOne(id: string) {
    const menuItem = this.menuItemModel.findById(id);
    if (!menuItem) return new NotFoundException('the menu item dosent exsist');
    return menuItem;
  }

  update(id: string, menuItem: any) {
    const exsintngmenuItem = this.menuItemModel.findOneAndUpdate(
      { id },
      menuItem,
    );
    if (!menuItem) return new NotFoundException('the menu item dosent exsist');
    return exsintngmenuItem;
  }
  delete(id: string) {
    const menuItem = this.menuItemModel.findByIdAndDelete(id);
    return menuItem;
  }
}
