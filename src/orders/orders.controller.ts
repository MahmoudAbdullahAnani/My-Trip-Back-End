import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import {
  CreateOrderPayPallDto,
  CreateOrderStripeDto,
} from './dto/create-order.dto';

@Controller('checkout-completed/stripe')
export class OrdersStripeController {
  constructor(private readonly ordersService: OrdersService) {}
  // @Desc any user can pay order stripe (visa, mastercard)
  // @Route POST /checkout-completed/paypall
  // @Access ['user Pay']
  @Post()
  createStripe(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    OrderData: CreateOrderStripeDto,
  ) {
    return this.ordersService.createStripe(OrderData);
  }
}
@Controller('checkout-completed/paypall')
export class OrdersPayPallController {
  constructor(private readonly ordersService: OrdersService) {}

  // @Desc any user can pay order for paypall
  // @Route POST /checkout-completed/paypall
  // @Access ['user Pay']
  @Post()
  createPaypal(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    OrderData: CreateOrderPayPallDto,
  ) {
    return this.ordersService.createPaypal(OrderData);
  }
}
