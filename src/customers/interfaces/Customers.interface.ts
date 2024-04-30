import { Document } from 'mongoose';
export interface CustomersInterface extends Document {
  readonly name: string;
  readonly email: number;
  readonly comment: number;
  readonly avatar: number;
}
