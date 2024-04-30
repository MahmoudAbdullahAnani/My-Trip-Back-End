import { Document } from 'mongoose';
export interface OffersHotelsInterface extends Document {
  readonly name: string;
  readonly rating: number;
  readonly counters: number;
  readonly image: string;
  readonly description: string;
}
