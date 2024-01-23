import { Connection } from 'mongoose';
import { NotificationsSchema } from '../schemas/users.schema';

export const userConnectionProvider = [
  {
    provide: 'Notifications_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Notifications', NotificationsSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
