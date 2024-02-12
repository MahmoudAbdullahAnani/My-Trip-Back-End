import { Document } from 'mongoose';
export interface OrderInterfacer extends Document {
  readonly name: string;
  readonly totalOrderPrice: string;
  readonly evt_id: string;
  readonly description: string;
  readonly address: string;
  readonly user_id: string;
  readonly currency: string;
  readonly email: string;
  readonly payment_method_types: string;
  readonly payment_intent: string;
  readonly status: string;
}
