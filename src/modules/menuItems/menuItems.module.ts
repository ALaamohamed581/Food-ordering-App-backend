import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import {
  Restaurant,
  RestaurantSchema,
} from '../restaurant/schemas/Resturant.schmea';
import { MenuItmeController } from './menuItems.controller';
import { MenuItmeService } from './menuItems.service';
import { MenuItem, MenuItemSchema } from './schemas/menuItems.schmea';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MenuItem.name, schema: MenuItemSchema },
      { name: Restaurant.name, schema: RestaurantSchema },
    ]),
  ],
  controllers: [MenuItmeController],
  providers: [MenuItmeService],
})
export class MenuItmeModule {}
