import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurntDto } from './dtos/CreateRestaurnt.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('restaurants')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post()
  // @UseInterceptors(FileInterceptor('file'))
  createResturnt(@Body() restaurant: CreateRestaurntDto) {
    return this.restaurantService.create(restaurant);
  }

  @Patch(':id/menu-items')
  addMenuItem(@Param('id') id: string, @Body() MeunItem: any) {
    return this.restaurantService.addMenuItem(id, MeunItem);
  }
}
