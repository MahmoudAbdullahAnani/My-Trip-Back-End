import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
// import { AirportSearchModule } from './airport-search/airport-search.module';
import { NotificationsModule } from './notifications/notifications.module';
import { OrdersModule } from './orders/orders.module';
import { CatchDataModule } from './catch-data/catch-data.module';
import { UploadModule } from './upload/upload.module';
import { HotelModule } from './hotel/hotel.module';
import { ChatModule } from './chat/chat.module';
import { MsgModule } from './msg/msg.module';
import { StaticSectionsModule } from './static-sections/static-sections.module';
import { OffersHotelsModule } from './offers-hotels/offers-hotels.module';
import { CustomersModule } from './customers/Customers.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    NotificationsModule,
    OrdersModule,
    CatchDataModule,
    UploadModule,
    HotelModule,
    ChatModule,
    MsgModule,
    StaticSectionsModule,
    OffersHotelsModule,
    CustomersModule,
    // AirportSearchModule,
  ],
})
export class AppModule {}
