import { Document } from 'mongoose';
export interface Notifications extends Document {
  readonly isSee: boolean;
  readonly title: string;
  readonly content: string;
  readonly date: Date;
}
