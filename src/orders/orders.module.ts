import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import {
  OrdersStripeController,
  OrdersPayPallController,
} from './orders.controller';
// DB
import { orderConnectionProvider } from './providers/databaseConnection.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [OrdersStripeController, OrdersPayPallController],
  providers: [...orderConnectionProvider, OrdersService],
})
export class OrdersModule {}
