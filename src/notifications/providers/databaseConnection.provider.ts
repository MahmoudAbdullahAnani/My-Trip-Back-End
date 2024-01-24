import { Connection } from 'mongoose';
import { NotificationsSchema } from '../schemas/notifications.schema';

export const notificationsConnectionProvider = [
  {
    provide: 'Notifications_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Notifications', NotificationsSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
