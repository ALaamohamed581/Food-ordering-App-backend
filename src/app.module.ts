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
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { UtlisModule } from './utlis/utlis.module';
import { RestaurantModul } from './modules/restaurant/restaurant.module';
import { PaymentModule } from './modules/payment/payment.module';
import { MenuItmeModule } from './modules/menu-itme/menu-itme.module';
import { OrderModule } from './modules/order/order.module';
import { CartModule } from './modules/order/cart/cart.module';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { Payload } from './types/jwtAuthTyoe';
import { v2 as cloudinary } from 'cloudinary';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import * as path from 'path';
import {
  AcceptLanguageResolver,
  HeaderResolver,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },

      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
        new HeaderResolver(['x-lang']),
      ],
    }),

    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 15,
      },
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
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
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class AppModule implements NestModule {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDNAIRY_CLOUD_NAME,
      api_key: process.env.CLOUDNAIRY_CLOUD_KEY,
      api_secret: process.env.CLOUDNAIRY_CLOUD_SECRET,
    });
  }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLooger, CorsConfiguration).forRoutes('*');
  }
}
