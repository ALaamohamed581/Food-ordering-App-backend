import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurntDto } from './dtos/CreateRestaurnt.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { QueryString } from 'src/types/QueryString';
import { PaginationPipe } from 'src/pipes/Pagination.pipe';
import { ImagesPipe } from 'src/pipes/images.pipe';
import { CACHE_MANAGER, CacheInterceptor } from '@nestjs/cache-manager';

@Controller('restaurants')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createResturnt(
    @Body() restaurant: CreateRestaurntDto,
    @UploadedFile(new ImagesPipe()) iamgeUrl: string,
  ) {
    restaurant.image = iamgeUrl || '';
    return this.restaurantService.create(restaurant);
  }
  @Get()
  @UseInterceptors(CacheInterceptor)
  async getAll(
    @Query(new PaginationPipe())
    { queryStr, limit, sort, fields, skip, page }: QueryString,
  ) {
    const data = await this.restaurantService.getAll({
      queryStr,
      limit,
      sort,
      fields,
      page,
      skip,
    });
    return data;
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
