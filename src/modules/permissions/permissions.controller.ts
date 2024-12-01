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
} from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PaginationPipe } from 'src/pipes/Pagination.pipe';
import { QueryString } from 'src/types/QueryString';
import { permissiongurd } from 'src/gurds/permissiongurd/permissiongurd.guard';
import { Request } from 'express';

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
