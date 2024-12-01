import { IsArray } from 'class-validator';

export class CreatePermissionDto {
  @IsArray()
  permission: string[];
}
