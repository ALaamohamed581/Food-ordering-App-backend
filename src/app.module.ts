import { doubleCsrfProtection } from './config/csrf.config';

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
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { UtlisModule } from './modules/utlis/utlis.module';
import { RestaurantModul } from './modules/restaurant/restaurant.module';
import { PaymentModule } from './modules/payment/payment.module';
import { MenuItmeModule } from './modules/menu-itme/menu-itme.module';
import { OrderModule } from './modules/order/order.module';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { Payload } from './types/JWTTypes';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import * as path from 'path';
import {
  AcceptLanguageResolver,
  HeaderResolver,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';
import conf from './config/conf';
import stripe from './config/stripe';
import { CartModule } from './modules/cart/cart.module';
import {ChatGateway} from './gateways/chat/chat.gateway'
@Module({
  imports: [
    UtlisModule.forRoot(),
    CacheModule.register({
      isGlobal: true,
      ttl: 30 * 1000,
    }),

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

    // ThrottlerModule.forRoot([
    //   {
    //     ttl: 60000,
    //     limit: 100,
    //   },
    // ]),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [conf, stripe],
    }),
    MongooseModule.forRoot(process.env.MONGO_URL, {
      maxPoolSize: 100,
    }),
    UserModule,
    AdminModule,
    AuthModule,
    RestaurantModul,

    CartModule,
    PaymentModule,
    MenuItmeModule,
    OrderModule,
    PermissionsModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },

    AppService,
    Logger,
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    ChatGateway,

    // { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class AppModule implements NestModule {
  constructor() {}
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLooger, CorsConfiguration,/*doubleCsrfProtection*/).forRoutes('*');
  }
}

