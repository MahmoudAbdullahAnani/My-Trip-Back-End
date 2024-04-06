import {
  HttpException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import {
  CreateOrderPayPallDto,
  CreateOrderStripeDto,
} from './dto/create-order.dto';
import { Model } from 'mongoose';
import { OrderInterfacer } from './interfaces/users.interface';
import { JwtService } from '@nestjs/jwt';
import { FlightOffer } from './interfaces/payPalWebhookEvent.inerface';
const stripe = require('stripe')(
  'sk_test_51OhY70Jz9GDytzMTDBZgLDGZRcmsIjHMoRgAfFwRkBB62r86y0QMzTzJwD21XNvo7tYWG7iJmBSs6IivPC9yDtWW00rRjVXqDX',
);

@Injectable()
export class OrdersService {
  constructor(
    @Inject('ORDER_MODEL') private readonly order: Model<OrderInterfacer>,
    private jwtService: JwtService,
  ) {}

  async createStripe(OrderData: CreateOrderStripeDto): Promise<any> {
    // console.log({ isStope: OrderData.isStope });

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
      metadata: {
        description: OrderData.description,
        user_id: OrderData.user_id,
        price: OrderData.price.toString(),
        logo: `https://assets.duffel.com/img/airlines/for-light-background/full-color-lockup/${OrderData.carrierCodeLogo}.svg`,
        timeGo: OrderData.timeGo || '',
        timeSet: OrderData.timeSet || '',
        durationH: OrderData.durationH || '',
        durationM: OrderData.durationM || '',
        isStope: OrderData.isStope || 0,
        typeSystem: OrderData.typeSystem || '',
      },
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
                customData: {
                  test: 'test',
                  description: OrderData.description,
                  user_id: OrderData.user_id,
                  price: OrderData.price.toString(),
                  logo: `https://assets.duffel.com/img/airlines/for-light-background/full-color-lockup/${OrderData.carrierCodeLogo}.svg`,
                  timeGo: OrderData.timeGo || '',
                  timeSet: OrderData.timeSet || '',
                  durationH: OrderData.durationH || '',
                  durationM: OrderData.durationM || '',
                  isStope: OrderData.isStope || 0,
                },
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
    function parseQueryString(url: string) {
      const queryString = url.split('?')[1];
      if (!queryString) {
        return {};
      }

      const params = {};
      queryString.split('&').forEach((param) => {
        const [key, value] = param.split('=');
        params[decodeURIComponent(key)] = decodeURIComponent(value);
      });

      return params;
    }
    const { adultsDataState } = OrderData;
    // console.log(Order);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const parsedParams: FlightOffer = parseQueryString(OrderData.OrderData);
    // console.log(parsedParams);

    const {
      system,
      status,
      BirthDateBooking,
      NameBooking,
      GenderBooking,
      EmailBooking,
      PassportNumberBooking,
      NationalityBooking,
      CountryBooking,
      price,
      itineraries,
      description,
      arrival,
      departure,
      user_id,
      logo,

      timeGo,
      timeSet,
      durationH,
      durationM,
      isStope,
    } = parsedParams;
    // console.log(itineraries);
    // http://localhost:3001/?system=air&status=success&BirthDateBooking=%2C28%2F05%2F2002&NameBooking=%2CMahmoud%20Abdullah&GenderBooking=%2CMr&EmailBooking=%2Cmahmoud18957321%40gmail.com&PassportNumberBooking=%2C4587978&NationalityBooking=%2CAT&CountryBooking=%2CEG&type=flight-offer&id=1&source=GDS&instantTicketingRequired=false&nonHomogeneous=false&oneWay=false&lastTicketingDate=2024-04-05&lastTicketingDateTime=2024-04-05&numberOfBookableSeats=4&itineraries=%5Bobject%20Object%5D&price=%5Bobject%20Object%5D&pricingOptions=%5Bobject%20Object%5D&validatingAirlineCodes=F9&travelerPricings=%5Bobject%20Object%5D&user_id=
    const dataInsert = {
      name: NameBooking.split(',')[1],
      totalOrderPrice: price.total,
      description: `${arrival} الى ${departure} رحلة من`,
      address: CountryBooking.split(',')[1] || 'Egypt',
      user_id: user_id || 'guest',
      currency: 'egp',
      email: EmailBooking.split(',')[1] || 'null',
      payment_method_types: `${system}-${
        parsedParams.PayerID ? 'PayPal' : 'Stripe'
      }`,
      status: status,
      // metaData: JSON.stringify(parsedParams),
      metaData: {
        description: `${arrival} الى ${departure} رحلة من`,
        logo: logo,
        timeGo: timeGo,
        timeSet: timeSet,
        durationH: durationH,
        durationM: durationM,
        isStope: isStope,
        user_id: user_id || 'guest',
        price: price.total,
      },
      typeSystem: system,
      countTickets: adultsDataState,
    };
    console.log(dataInsert);
    return await this.order.create(dataInsert);
    // https://ittrip.vercel.app/?system=air&status=success&isStope=0&durationM=&durationH=14&logo=F9&timeGo=2024-04-11T10:50:00&timeSet=2024-04-11T21:50:00&BirthDateBooking=%2C28%2F05%2F2002&NameBooking=%2CHend%20Ali&GenderBooking=%2CMr&EmailBooking=%2ChendAli%40gmail.com&PassportNumberBooking=%2C4587978&NationalityBooking=%2CAZ&CountryBooking=%2CEG&type=flight-offer&id=1&source=GDS&instantTicketingRequired=false&nonHomogeneous=false&oneWay=false&lastTicketingDate=2024-04-06&lastTicketingDateTime=2024-04-06&numberOfBookableSeats=4&itineraries=%5Bobject%20Object%5D&price=%5Bobject%20Object%5D&pricingOptions=%5Bobject%20Object%5D&validatingAirlineCodes=F9&travelerPricings=%5Bobject%20Object%5D&user_id=65e18dcd097330f55e64a8e6&arrival=SFO&departure=LGA
    // // stripe
    // if (OrderData.type === 'checkout.session.completed') {
    //   return await this.order.create({
    //     name: OrderData.data.object.customer_details.name,
    //     totalOrderPrice: +OrderData.data.object.amount_total,
    //     evt_id: OrderData.id,
    //     description:
    //       OrderData.data.object.invoice_creation.invoice_data.description ||
    //       'null',
    //     address: OrderData.data.object.customer_details.address.country,
    //     user_id: OrderData.data.object.client_reference_id,
    //     currency: OrderData.data.object.currency || 'egp',
    //     email: OrderData.data.object.customer_email,
    //     payment_method_types: `${OrderData.data.object.payment_method_types[0]}-Stripe`,
    //     payment_intent: OrderData.data.object.payment_intent,
    //     status: OrderData.data.object.status,
    //     metaData: OrderData.data.object.metadata,
    //     typeSystem: OrderData.data.object.metadata.typeSystem,
    //   });
    // }

    // // Paypal
    // if (OrderData.event_type === 'CHECKOUT.ORDER.APPROVED') {
    //   // console.log({ OrderData });

    //   return await this.order.create({
    //     name: `${OrderData.resource.payer.name.given_name} ${OrderData.resource.payer.name.surname}`,
    //     totalOrderPrice: +OrderData.resource.purchase_units[0].amount.value,
    //     evt_id: OrderData.id,
    //     description: OrderData.summary || 'null',
    //     address: OrderData.resource.payer.address.country_code,
    //     user_id: OrderData.resource.purchase_units[0].reference_id,
    //     currency:
    //       OrderData.resource.purchase_units[0].amount.currency_code || 'USD',
    //     email: OrderData.resource.payment_source.paypal.email_address,
    //     payment_method_types: `Paypal`,
    //     payment_intent: OrderData.resource.intent,
    //     status: OrderData.status,
    //     metaData:
    //       OrderData.resource.purchase_units[0].metaData || 'not found metaData',
    //   });
    // }
  }

  // Finds
  async findMyOrders(req): Promise<any> {
    const token = req.headers?.authorization.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException();
    }

    const payload = await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });

    const orders = await this.order.find({
      user_id: payload._id,
    });
    return { data: orders, count: orders.length };
  }
}
