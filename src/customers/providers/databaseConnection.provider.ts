import { Connection } from 'mongoose';
import { customersSchema } from '../schemas/CustomersSchema.schema';

export const customersConnectionProvider = [
  {
    provide: 'CUSTOMERS_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Customers', customersSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
