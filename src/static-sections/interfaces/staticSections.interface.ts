import { Document } from 'mongoose';
export interface PopularDestinations extends Document {
  titleAR: string;
  titleEN: string;
  img: string;
}
