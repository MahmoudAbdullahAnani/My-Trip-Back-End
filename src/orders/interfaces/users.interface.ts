import { Document } from 'mongoose';
export interface OrderInterfacer extends Document {
  readonly name: string;
  readonly totalOrderPrice: string;
  readonly evt_id: string;
  readonly description: {};
  readonly address: string;
  readonly user_id: string;
  readonly currency: string;
  readonly email: string;
  readonly payment_method_types: string;
  readonly payment_intent: string;
  readonly status: string;
  readonly BirthDateBooking: string;
  readonly typeSystem: string;
  readonly ExpiryDate: string;
  readonly PhoneNumber: string;
  readonly adultsDataState: string;
  readonly GenderBooking: string;
  readonly NationalityBooking: string;
  readonly CountryBooking: string;
  readonly PassportNumberBooking: string;
  readonly typeTravelState: string;
  readonly tripData: {};
  readonly metaData: {
    description: string;
    logo: string;
    price: string;
    timeGo: string;
    timeSet: string;
    user_id: string;
    durationH: string;
    durationM: string;
    isStope: string;
  };
}
