import { Document } from 'mongoose';
export interface Notifications extends Document {
  readonly title: string;
  readonly content: string;
  readonly exDate: Date;
}
