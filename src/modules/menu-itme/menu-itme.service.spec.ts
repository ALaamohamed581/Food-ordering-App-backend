import { Test, TestingModule } from '@nestjs/testing';
import { MenuItmeService } from './menu-itme.service';

describe('MenuItmeService', () => {
  let service: MenuItmeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MenuItmeService],
    }).compile();

    service = module.get<MenuItmeService>(MenuItmeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
