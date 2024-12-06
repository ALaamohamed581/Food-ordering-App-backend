import { IsString, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateUserChatsDto {
  @IsString()
  @IsOptional()
  sender?: string;

  @IsString()
  @IsOptional()
  reciverId?: Types.ObjectId;

  @IsString()
  @IsOptional()
  chatId?: string;

  @IsString()
  @IsOptional()
  message?: string;
}
