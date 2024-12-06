import { IsString, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class CreateUserChatsDto {
  @IsString()
  @IsNotEmpty()
  senderId: string;

  @IsString()
  @IsNotEmpty()
  reciverId: Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  chatId: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}
