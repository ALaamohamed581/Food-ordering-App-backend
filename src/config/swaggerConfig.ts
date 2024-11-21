import { DocumentBuilder } from '@nestjs/swagger';

export const config = new DocumentBuilder()
  .setTitle('Food trove')
  .setDescription('Food trove API description')
  .setVersion('1.0')
  .addTag('Food trove')
  .build();
