import { Connection } from 'mongoose';
import { OffersHotelsSchema } from '../schemas/OffersHotels.schema';

export const offersHotelsConnectionProvider = [
  {
    provide: 'OFFERS_HOTELS_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('OffersHotels', OffersHotelsSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
