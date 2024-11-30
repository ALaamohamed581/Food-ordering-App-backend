import { Module } from '@nestjs/common';
import { MenuItmeService } from './menu-itme.service';
import { MenuItmeController } from './menu-itme.controller';
import { MenuItem, MenuItemSchema } from './schemas/Resturant.schmea';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Restaurant,
  RestaurantSchema,
} from '../restaurant/schemas/Resturant.schmea';

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
