import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurntDto } from './dto/create-restaurant.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { ImagesPipe } from '../../common/pipes/images.pipe';
import { PaginationPipe } from '../../common/pipes/pagination.pipe';
import { QueryString } from 'src/types/QueryString';
@UseInterceptors(CacheInterceptor)
@Controller('restaurants')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createResturnt(
    @Body() restaurant: CreateRestaurntDto,
    @UploadedFile(new ImagesPipe()) iamgeUrls: string,
  ) {
    [restaurant.image] = iamgeUrls || '';
    return this.restaurantService.create(restaurant);
  }
  @Get()
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
