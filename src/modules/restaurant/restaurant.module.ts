import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';
import { Restaurant, RestaurantSchema } from './schemas/Resturant.schmea';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [
        () => ({
          CLOUDNAIRY_CLOUD_NAME: process.env.CLOUDNAIRY_CLOUD_NAME,
          CLOUDNAIRY_CLOUD_KEY: process.env.CLOUDNAIRY_CLOUD_KEY,
          CLOUDNAIRY_CLOUD_SECRET: process.env.CLOUDNAIRY_CLOUD_SECRET,
        }),
      ],
    }),
    MongooseModule.forFeature([
      { name: Restaurant.name, schema: RestaurantSchema },
    ]),
  ],
  controllers: [RestaurantController],
  providers: [RestaurantService],
})
export class RestaurantModul {}
