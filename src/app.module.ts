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
import { RestaurantModule } from './modules/restaurant/restaurant.module';
import { UtlisModule } from './utlis/utlis.module';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    MongooseModule.forRoot(process.env.MONGO_URL),
    UserModule,
    AdminModule,
    AuthModule,
    RestaurantModule,
    UtlisModule,
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
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLooger, CorsConfiguration).forRoutes('*');
  }
}
