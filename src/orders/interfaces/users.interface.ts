import { Document } from 'mongoose';
export interface OrderInterfacer extends Document {
  readonly name: string;
  readonly totalOrderPrice: number;
  readonly user_id: string;
  readonly currency: string;
  readonly email: string;
  readonly paidAt: Date;
  readonly metadata: string;
}
