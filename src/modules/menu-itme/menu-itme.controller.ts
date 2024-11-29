import { Controller } from '@nestjs/common';
import { MenuItmeService } from './menu-itme.service';

@Controller('menu-itme')
export class MenuItmeController {
  constructor(private readonly menuItmeService: MenuItmeService) {}
}
