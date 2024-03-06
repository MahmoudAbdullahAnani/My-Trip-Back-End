import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
// import { AirportSearchModule } from './airport-search/airport-search.module';
import { NotificationsModule } from './notifications/notifications.module';
import { OrdersModule } from './orders/orders.module';
// import { CatchDataModule } from './catch-data/catch-data.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    NotificationsModule,
    OrdersModule,
    // CatchDataModule,
    // AirportSearchModule,
  ],
})
export class AppModule {}
