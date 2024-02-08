import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
const stripe = require('stripe')(
  'sk_test_51OhY70Jz9GDytzMTDBZgLDGZRcmsIjHMoRgAfFwRkBB62r86y0QMzTzJwD21XNvo7tYWG7iJmBSs6IivPC9yDtWW00rRjVXqDX',
);

@Injectable()
export class OrdersService {
  async create(OrderData: CreateOrderDto): Promise<any> {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'egp',
            unit_amount: Math.round(OrderData.price * 100),
            product_data: {
              name: 'My-trip',
              description: OrderData.description,
              images: [
                `https://assets.duffel.com/img/airlines/for-light-background/full-color-lockup/${OrderData.carrierCodeLogo}.svg`,
              ],
            },
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: OrderData.urlSuccess,
      cancel_url: OrderData.urlCancel,

      client_reference_id: OrderData.user_id,
      customer_email: OrderData.userEmail,
    });
    return session;
  }
}
