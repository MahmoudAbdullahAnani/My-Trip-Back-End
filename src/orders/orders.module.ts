import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersStripeController, OrdersPayPallController } from './orders.controller';

@Module({
  controllers: [OrdersStripeController, OrdersPayPallController],
  providers: [OrdersService],
})
export class OrdersModule {}
