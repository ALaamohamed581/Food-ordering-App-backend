import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';
import { Restaurant, RestaurantSchema } from './schemas/Resturant.schmea';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Restaurant.name, schema: RestaurantSchema },
    ]),
  ],
  controllers: [RestaurantController],
  providers: [RestaurantService],
})
export class RestaurantModul {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(Paginate)
  //     .exclude(
  //       {
  //         path: 'restaurants',
  //         method: RequestMethod.POST,
  //       },
  //       {
  //         path: 'restaurants',
  //         method: RequestMethod.PATCH,
  //       },
  //     )
  //     .forRoutes(RestaurantController);
  // }
}
