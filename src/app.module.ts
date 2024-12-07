import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { AppController } from './app.controller';

import { AdminModule } from './modules/admin/admin.module';
import { UtlisModule } from './modules/utlis/utlis.module';
import { RestaurantModul } from './modules/restaurant/restaurant.module';
import { PaymentModule } from './modules/payment/payment.module';
import { MenuItmeModule } from './modules/menu-itme/menu-itme.module';
import { OrderModule } from './modules/order/order.module';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { CartModule } from './modules/cart/cart.module';
import { AuthModule } from './modules/UserModules/auth/auth.module';
import { UserModule } from './modules/UserModules/user/user.module';
import { ChatGateway } from './common/gateways/chat/chat.gateway';
import { GlobalModlue } from './modules/globlaModules/global.module';
import { CorsConfiguration } from './common/middlewares/corsConfiguration';
import { RequestLooger } from './common/middlewares/logger';

@Module({
  imports: [
    UtlisModule.forRoot(),
    GlobalModlue.forRoot(),
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
  providers: [ChatGateway, Logger],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestLooger, CorsConfiguration /*doubleCsrfProtection*/)
      .forRoutes('*');
  }
}
