import { HttpException, Inject, Injectable } from '@nestjs/common';
import {
  CreateOrderPayPallDto,
  CreateOrderStripeDto,
} from './dto/create-order.dto';
import { Model } from 'mongoose';
import { OrderInterfacer } from './interfaces/users.interface';
const stripe = require('stripe')(
  'sk_test_51OhY70Jz9GDytzMTDBZgLDGZRcmsIjHMoRgAfFwRkBB62r86y0QMzTzJwD21XNvo7tYWG7iJmBSs6IivPC9yDtWW00rRjVXqDX',
);

@Injectable()
export class OrdersService {
  constructor(
    @Inject('ORDER_MODEL') private readonly order: Model<OrderInterfacer>,
  ) {}

  async createStripe(OrderData: CreateOrderStripeDto): Promise<any> {
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
  async createPaypal(OrderData: CreateOrderPayPallDto): Promise<any> {
    //PayPal Developer YouTube Video:
    //How to Retrieve an API Access Token (Node.js)
    //https://www.youtube.com/watch?v=HOkkbGSxmp4
    let data = {};
    async function handleOrderData(token: string) {
      const response = await fetch(
        process.env.API_SENDBOX_PAYPAL + '/v2/checkout/orders',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            intent: 'CAPTURE',
            purchase_units: [
              {
                custom_id: OrderData.user_id,
                reference_id: OrderData.user_id,
                amount: {
                  value: OrderData.price.toString(),
                  currency_code: 'USD',
                },
              },
            ],
            payment_source: {
              paypal: {
                experience_context: {
                  payment_method_preference: 'IMMEDIATE_PAYMENT_REQUIRED',
                  brand_name: 'EXAMPLE INC',
                  locale: 'ar-EG',
                  landing_page: 'LOGIN',
                  shipping_preference: 'NO_SHIPPING',
                  user_action: 'PAY_NOW',
                  return_url: OrderData.urlSuccess,
                  cancel_url: OrderData.urlCancel,
                },
              },
            },
          }),
        },
      );
      const json = await response.json();
      data = json;
      return json;
    }

    async function get_access_token() {
      const auth = `${process.env.CLIENT_ID_PAYPAL}:${process.env.SECRET_PAYPAL}`;
      const data = 'grant_type=client_credentials';
      await fetch(process.env.API_SENDBOX_PAYPAL + '/v1/oauth2/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${Buffer.from(auth).toString('base64')}`,
        },
        body: data,
      })
        .then((res) => res.json())
        .then(async (json) => {
          await handleOrderData(json.access_token);
          return json.access_token;
        });
    }
    await get_access_token();
    return data;
  }
  async createOrder(OrderData): Promise<any> {
    if (OrderData.type === 'checkout.session.completed') {
      // console.log('OrderData===> ', OrderData);
      // console.log('customer_details===> ', OrderData.customer_details);

      return await this.order.create({
        name: OrderData.data.object.customer_details.name,
        totalOrderPrice: +OrderData.data.object.amount_total,
        evt_id: OrderData.id,
        description:
          OrderData.data.object.invoice_creation.invoice_data.description ||
          'null',
        address: OrderData.data.object.customer_details.address.country,
        user_id: OrderData.data.object.client_reference_id,
        currency: OrderData.data.object.currency,
        email: OrderData.data.object.customer_email,
        payment_method_types: OrderData.data.object.payment_method_types[0],
        payment_intent: OrderData.data.object.payment_intent,
        status: OrderData.data.object.status,
      });
    }
  }
}
