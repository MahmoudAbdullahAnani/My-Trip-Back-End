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
