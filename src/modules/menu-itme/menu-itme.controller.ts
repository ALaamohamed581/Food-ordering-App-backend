import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { MenuItmeService } from './menu-itme.service';
import { MenuItemPipe } from './pipes/MenuItem.pipe';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImagesPipe } from 'src/pipes/images.pipe';

@Controller('menu-itmes')
export class MenuItmeController {
  constructor(private readonly menuItmeService: MenuItmeService) {}
  @UseInterceptors(FileInterceptor('image'))
  @Post()
  create(
    @Body() menuItem: any,
    @UploadedFile(new ImagesPipe()) iamgeUrl: string,
  ) {
    menuItem.image = iamgeUrl;
    return this.menuItmeService.create(menuItem);
  }
  @Get()
  getAll(@Query(new MenuItemPipe()) qstr) {
    return this.menuItmeService.getAll(qstr);
  }
  @Get('/:id')
  getOne(@Param('id') id: string) {
    return this.menuItmeService.getOne(id);
  }
  @Patch('/:id')
  @UseInterceptors(FileInterceptor('image'))
  update(@Param('id') id: string, @Body() menuItem: any) {
    return this.menuItmeService.update(id, menuItem);
  }
  @Delete('/id')
  delete(@Param() id: string) {
    return this.menuItmeService.delete(id);
  }
}
