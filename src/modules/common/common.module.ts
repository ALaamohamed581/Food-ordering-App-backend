import { DynamicModule, Module } from '@nestjs/common';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import {
  AcceptLanguageResolver,
  HeaderResolver,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';
import conf from '../../config/conf';
import { MongooseModule } from '@nestjs/mongoose';
import * as path from 'path';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AllExceptionFilter } from '../../common/helpers/allExceptionsFilter'; // استخدم * للتوافقية
import { SignIn } from '../../common/Interceptores/signin.intecptor';

@Module({})
export class CommonModule {
  static forRoot(): DynamicModule {
    return {
      module: CommonModule,
      imports: [
        CacheModule.register({
          isGlobal: true,
          ttl: 60 * 1000, // 1 minute
        }),
        I18nModule.forRoot({
          fallbackLanguage: 'en',
          loaderOptions: {
            path: path.join(__dirname, '../../common/i18n'),
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
            limit: 100,
          },
        ]),

        ConfigModule.forRoot({
          isGlobal: true,
          load: [conf],
        }),
        MongooseModule.forRoot(process.env.MONGO_URL, {
          maxPoolSize: 100,
        }),
      ],
      providers: [
        {
          provide: APP_INTERCEPTOR,
          useClass: CacheInterceptor,
        },
        {
          provide: APP_INTERCEPTOR,
          useValue: SignIn,
        },

        {
          provide: APP_FILTER,
          useClass: AllExceptionFilter,
        },
        { provide: APP_GUARD, useClass: ThrottlerGuard },
      ],
      exports: [],
      global: true,
    };
  }
}
