import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
// import { AirportSearchModule } from './airport-search/airport-search.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    // AirportSearchModule,
    NotificationsModule,
  ],
})
export class AppModule {}
