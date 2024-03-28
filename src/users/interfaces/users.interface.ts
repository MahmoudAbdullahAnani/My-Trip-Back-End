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
  readonly verificationAccountCode: string;
  readonly passportNumber: string;
  readonly country: string;
  readonly nationality: string;
  readonly gender: string;
  readonly chatSocketId: string;
  readonly chatSocketAdminId: string;
  readonly notification: [];
  readonly pendingFriends: [];
  readonly friends: [];
}
