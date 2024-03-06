import { Connection } from 'mongoose';
import { CatchDataSchema } from '../schemas/catch-data.schema';

export const CatchDataConnectionProvider = [
  {
    provide: 'CATCH_DATA_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('CatchData', CatchDataSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
