import { Test, TestingModule } from '@nestjs/testing';
import { MenuItmeController } from './menu-itme.controller';
import { MenuItmeService } from './menu-itme.service';

describe('MenuItmeController', () => {
  let controller: MenuItmeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MenuItmeController],
      providers: [MenuItmeService],
    }).compile();

    controller = module.get<MenuItmeController>(MenuItmeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
