export interface PayPalWebhookEvent {
  id: string;
  create_time: string;
  resource_type: string;
  event_type: string;
  summary: string;
  resource: {
    create_time: string;
    purchase_units: [
      {
        reference_id: string;
        amount: {
          currency_code: string;
          value: string;
        };
        payee: {
          email_address: string;
          merchant_id: string;
          display_data: {
            brand_name: string;
          };
        };
        custom_id: string;
      },
    ];
    links: [
      {
        href: string;
        rel: string;
        method: string;
      },
    ];
    id: string;
    payment_source: {
      paypal: {
        email_address: string;
        account_id: string;
        account_status: string;
        name: {
          given_name: string;
          surname: string;
        };
        address: {
          country_code: string;
        };
      };
    };
    intent: string;
    payer: {
      name: {
        given_name: string;
        surname: string;
      };
      email_address: string;
      payer_id: string;
      address: {
        country_code: string;
      };
    };
    status: string;
  };
  status: string;
  transmissions: [
    {
      webhook_url: string;
      http_status: number;
      reason_phrase: string;
      response_headers: {
        [key: string]: string;
      };
      transmission_id: string;
      status: string;
      timestamp: string;
    },
  ];
  links: [
    {
      href: string;
      rel: string;
      method: string;
      encType: string;
    },
    {
      href: string;
      rel: string;
      method: string;
      encType: string;
    },
  ];
  event_version: string;
  resource_version: string;
}

export interface FlightOffer {
  type: string;
  id: string;
  source: string;
  instantTicketingRequired: boolean;
  nonHomogeneous: boolean;
  oneWay: boolean;
  lastTicketingDate: string;
  lastTicketingDateTime: string;
  numberOfBookableSeats: number;
  itineraries: Itinerary[];
  price: Price;
  pricingOptions: PricingOptions;
  validatingAirlineCodes: string[];
  travelerPricings: TravelerPricing[];
  system: string;
  status: string;
  BirthDateBooking: string;
  NameBooking: string;
  GenderBooking: string;
  EmailBooking: string;
  PassportNumberBooking: string;
  NationalityBooking: string;
  CountryBooking: string;
  PayerID: string;
}

export interface Itinerary {
  duration: string;
  segments: Segment[];
}

export interface Segment {
  departure: {
    iataCode: string;
    terminal?: string;
    at: string;
  };
  arrival: {
    iataCode: string;
    terminal?: string;
    at: string;
  };
  carrierCode: string;
  number: string;
  aircraft: {
    code: string;
  };
  operating: {
    carrierCode: string;
  };
  duration: string;
  id: string;
  numberOfStops: number;
  blacklistedInEU: boolean;
}

export interface Price {
  currency: string;
  total: string;
  base: string;
  fees: Fee[];
  grandTotal: string;
}

export interface Fee {
  amount: string;
  type: string;
}

export interface PricingOptions {
  fareType: string[];
  includedCheckedBagsOnly: boolean;
}

export interface TravelerPricing {
  travelerId: string;
  fareOption: string;
  travelerType: string;
  price: Price;
  fareDetailsBySegment: FareDetails[];
}

export interface FareDetails {
  segmentId: string;
  cabin: string;
  fareBasis: string;
  brandedFare: string;
  brandedFareLabel: string;
  class: string;
  includedCheckedBags: {
    quantity: number;
  };
  amenities: Amenity[];
}

export interface Amenity {
  description: string;
  isChargeable: boolean;
  amenityType: string;
  amenityProvider: {
    name: string;
  };
}

export type Testimonial = {
  id: number;
  name: string;
  designation: string;
  content: string;
  image: string;
  star: number;
};
