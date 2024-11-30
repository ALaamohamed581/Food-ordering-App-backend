import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurntDto } from './dtos/CreateRestaurnt.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { QueryString } from 'src/types/QueryString';
import { PaginationPipe } from 'src/pipes/Pagination.pipe';
import { MenuItemPipe } from '../menu-itme/pipes/MenuItem.pipe';

@Controller('restaurants')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createResturnt(
    @Body() restaurant: CreateRestaurntDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    // let arrayBuffer = file.buffer.slice(0, 8);
    // let magicNumber = Array.from(new Uint8Array(arrayBuffer))
    //   .map((byte) => byte.toString(16).padStart(2, '0'))
    //   .join(' ');

    return this.restaurantService.create(restaurant);
  }
  @Get()
  async getAll(
    @Query(new PaginationPipe())
    { queryStr, limit, sort, fields, skip }: QueryString,
  ) {
    return await this.restaurantService.getAll({
      queryStr,
      limit,
      sort,
      fields,
      skip,
    });
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.restaurantService.getOne(id);
  }
  @Patch(':id/menu-items')
  addMenuItem(@Param('id') id: string, @Body() MeunItem: any) {
    return this.restaurantService.addMenuItem(id, MeunItem);
  }
}
