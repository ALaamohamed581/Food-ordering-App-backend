import { Module } from '@nestjs/common';
import { MenuItmeService } from './menu-itme.service';
import { MenuItmeController } from './menu-itme.controller';

@Module({
  controllers: [MenuItmeController],
  providers: [MenuItmeService],
})
export class MenuItmeModule {}
