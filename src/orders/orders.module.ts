import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import {
  OrdersStripeController,
  OrdersPayPallController,
  CompletedOrdersController,
} from './orders.controller';
// DB
import { orderConnectionProvider } from './providers/databaseConnection.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [
    OrdersStripeController,
    OrdersPayPallController,
    CompletedOrdersController,
  ],
  providers: [...orderConnectionProvider, OrdersService],
})
export class OrdersModule {}
