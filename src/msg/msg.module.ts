import { Module } from '@nestjs/common';
import { MsgService } from './services/msg.service';
import { MsgController } from './controllers/msg.controller';
import { SubController } from './controllers/sub.controller';
import { SubService } from './services/sub.service';
import { MainMsgConnectionProvider } from './providers/databaseConnection.provider';
import { DatabaseModule } from 'src/database/database.module';
import { EmailService } from 'src/users/email.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [MsgController, SubController],
  providers: [
    ...MainMsgConnectionProvider,
    MsgService,
    SubService,
    EmailService,
  ],
})
export class MsgModule {}
