import { Document } from 'mongoose';
export interface Users extends Document {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly userName: string;
  readonly password: string;
  readonly role: string;
  readonly avatar: string;
  readonly age: number;
  readonly phoneNumber: string;
  readonly address: string;
  readonly active: boolean;
  readonly verificationCode: string;
}
