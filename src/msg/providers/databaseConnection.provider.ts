import { Connection } from 'mongoose';
import { MsgSchema, SubSchema } from '../schemas/mainMsg.schema';

export const MainMsgConnectionProvider = [
  {
    provide: 'SUB_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Subscribe', SubSchema),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'MSG_MODEL',
    useFactory: (connection: Connection) => connection.model('Msg', MsgSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
