import {
  HttpException,
  HttpStatus,
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
import axios from 'axios';
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

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const parsedParams: FlightOffer = parseQueryString(OrderData.OrderData);

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
      price1,
      itineraries,
      description,
      arrival,
      departure,
      user_id,
      logo,
      PhoneNumber,
      ExpiryDate,
      timeGo,
      timeSet,
      durationH,
      durationM,
      isStope,
      adultsDataState,
      typeTravelState,
    } = parsedParams;

    const dataInsert = {
      typeTravelState,
      PassportNumberBooking: PassportNumberBooking.split(',')[1],
      GenderBooking: GenderBooking.split(',')[1],
      BirthDateBooking: BirthDateBooking.split(',')[1],
      NationalityBooking: NationalityBooking.split(',')[1],
      CountryBooking: CountryBooking.split(',')[1],
      adultsDataState: adultsDataState,
      ExpiryDate: ExpiryDate.split(',')[1],
      PhoneNumber: PhoneNumber.split(',')[1],
      name: NameBooking.split(',')[1],
      totalOrderPrice: price1,
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
        logo: `https://assets.duffel.com/img/airlines/for-light-background/full-color-lockup/${logo}.svg`,
        timeGo: timeGo,
        timeSet: timeSet,
        durationH: durationH,
        durationM: durationM,
        isStope: isStope,
        user_id: user_id || 'guest',
        price: price1,
      },
      typeSystem: system,
      countTickets: adultsDataState,
    };
    // const data = parsedParams

    return await this.order.create(dataInsert);
  }

  async confirmationOrder(
    Data,
    OrderID: string,
    amadeusToken: string,
  ): Promise<any> {
    const OrderGetData = await this.order.findById(OrderID);
    if (!OrderGetData) {
      throw new HttpException('Order Not Found', HttpStatus.NOT_FOUND);
    }
    // const Order = await this.order.findByIdAndUpdate(
    //   OrderID,
    //   {
    //     tripData: { ...Data },
    //   },
    //   { new: true },
    // );

    // Req Amadeus
    const dataBooking = {
      data: {
        type: 'flight-order',
        flightOffers: [Data.Data],
        travelers: [
          {
            id: '1',
            dateOfBirth: OrderGetData.BirthDateBooking,
            name: {
              firstName: OrderGetData.name,
              lastName: OrderGetData.name,
            },
            gender: OrderGetData.GenderBooking === 'Mr' ? 'MALE' : 'FEMALE',
            contact: {
              emailAddress: OrderGetData.email,
              phones: [
                {
                  number: OrderGetData.PhoneNumber,
                  countryCallingCode: OrderGetData.PhoneNumber.slice(0, 2),
                  deviceType: 'MOBILE',
                },
              ],
            },
            documents: [
              {
                documentType: 'PASSPORT',
                birthPlace: OrderGetData.CountryBooking,
                issuanceLocation: OrderGetData.CountryBooking,
                number: OrderGetData.PassportNumberBooking,
                expiryDate: OrderGetData.ExpiryDate,
                issuanceCountry: OrderGetData.CountryBooking,
                validityCountry: OrderGetData.CountryBooking,
                nationality: OrderGetData.NationalityBooking,
                holder: true,
              },
            ],
          },
        ],
      },
    };
    console.log('...dataBooking', dataBooking.data);

    await axios
      .post(
        `https://test.api.amadeus.com/v1/booking/flight-orders`,
        {
          ...dataBooking,
        },
        {
          headers: {
            Authorization: `Bearer ${amadeusToken}`,
          },
        },
      )
      .then(async (res) => {
        await this.order.findByIdAndUpdate(
          OrderID,
          {
            tripData: { ...Data },
          },
          { new: true },
        );
        console.log('res-Order==>', res.data);
      })
      .catch((err) => {
        console.log('err-Order==>', err.response.data);
      });
    return;
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
