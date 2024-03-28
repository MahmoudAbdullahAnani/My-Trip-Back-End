import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { DatabaseModule } from 'src/database/database.module';
import { userConnectionProvider } from 'src/users/providers/databaseConnection.provider';

@Module({
  imports: [DatabaseModule],
  providers: [...userConnectionProvider, ChatGateway, ChatService],
})
export class ChatModule {}
