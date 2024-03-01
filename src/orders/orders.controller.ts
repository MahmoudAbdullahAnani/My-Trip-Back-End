import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UseGuards,
  Request,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import {
  CreateOrderPayPallDto,
  CreateOrderStripeDto,
} from './dto/create-order.dto';
import { UsersGuard } from 'src/users/guards/users.guard';
import { Roles } from 'src/users/guards/roles.decorator';

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
@Controller('checkout-completed/paypal')
export class OrdersPayPallController {
  constructor(private readonly ordersService: OrdersService) {}

  // @Desc any user can pay order for paypal
  // @Route POST /checkout-completed/paypal
  // @Access ['user Pay']
  @Post()
  createPaypal(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    OrderData: CreateOrderPayPallDto,
  ) {
    return this.ordersService.createPaypal(OrderData);
  }
}
@Controller('checkout-completed')
export class CompletedOrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  // =========================================================================================================================================

  // @Desc When user completed payment then create order in system
  // @Route POST /checkout-completed
  // @Access ['User Payment']

  @Post()
  createPaypal(
    @Body()
    OrderData,
  ) {
    return this.ordersService.createOrder(OrderData);
  }
  // =========================================================================================================================================
  // =========================================================================================================================================

  // @Desc user can view order
  // @Route Get /checkout-completed
  // @Access ['user']
  @Get()
  @UseGuards(UsersGuard)
  @Roles(['user'])
  findMyOrders(
    @Request()
    req,
  ) {
    return this.ordersService.findMyOrders(req);
  }
  // =========================================================================================================================================
}
