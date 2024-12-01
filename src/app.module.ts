declare module 'Express' {
  interface Request {
    payload: Payload;
    queryString: any;
  }
}
import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RequestLooger } from './middlewares/Logger';
import { CorsConfiguration } from './middlewares/CorsConfiguration';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './modules/admin/admin.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { AllExceptionFilter } from './helpers/alllExceptionsFilter';
import { APP_FILTER } from '@nestjs/core';
import { UtlisModule } from './utlis/utlis.module';
import { RestaurantModul } from './modules/restaurant/restaurant.module';
import { PaymentModule } from './modules/payment/payment.module';
import { MenuItmeModule } from './modules/menu-itme/menu-itme.module';
import { OrderModule } from './modules/order/order.module';
import { CartModule } from './modules/order/cart/cart.module';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { Payload } from './types/jwtAuthTyoe';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        () => ({
          CLOUDNAIRY_CLOUD_NAME: process.env.CLOUDNAIRY_CLOUD_NAME,
          CLOUDNAIRY_CLOUD_KEY: process.env.CLOUDNAIRY_CLOUD_KEY,
          CLOUDNAIRY_CLOUD_SECRET: process.env.CLOUDNAIRY_CLOUD_SECRET,
        }),
      ],
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    UserModule,
    AdminModule,
    AuthModule,
    RestaurantModul,
    UtlisModule,
    CartModule,
    PaymentModule,
    MenuItmeModule,
    OrderModule,
    PermissionsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    Logger,
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  constructor() {}
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLooger, CorsConfiguration).forRoutes('*');
  }
}
