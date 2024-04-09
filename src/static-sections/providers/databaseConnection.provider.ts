import { Connection } from 'mongoose';
import { PopularDestinations } from '../schemas/staticSections.schema';

export const staticSectionsConnectionProvider = [
  {
    provide: 'Popular_Destinations_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('PopularDestinations', PopularDestinations),
    inject: ['DATABASE_CONNECTION'],
  },
];
