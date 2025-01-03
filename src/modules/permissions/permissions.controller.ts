import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { QueryString } from 'src/types/QueryString';
import { Request } from 'express';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { PaginationPipe } from 'src/common/pipes/pagination.pipe';
import { permissiongurd } from 'src/common/gurds/permissiongurd/permissiongurd.guard';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  @UseGuards(permissiongurd('createPermission'))
  create(
    @Req() req: Request,
    @Body() createPermissionDto: CreatePermissionDto,
  ) {
    return this.permissionsService.create(createPermissionDto);
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  findAll(
    @Query(new PaginationPipe())
    { fields, limit, queryStr, skip, sort, page }: QueryString,
  ) {
    return this.permissionsService.findAll({
      fields,
      limit,
      queryStr,
      skip,
      sort,
      page,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.permissionsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ) {
    return this.permissionsService.update(id, updatePermissionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.permissionsService.remove(id);
  }
}
