import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MenuItem } from './schemas/Resturant.schmea';
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
  getAll(qstr) {
    return this.menuItemModel.find(qstr).lean().exec();
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
