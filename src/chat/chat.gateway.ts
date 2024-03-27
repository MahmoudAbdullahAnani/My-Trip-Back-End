import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';

import { Server, Socket } from 'socket.io';
@WebSocketGateway({ cors: true })
export class ChatGateway {
  constructor(private readonly chatService: ChatService) {}

  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      this.server.emit('userId', socket.id);
      console.log('Connected');
    });
  }

  @SubscribeMessage('message')
  create(@ConnectedSocket() client: Socket, @MessageBody() message): void {
    console.log({ message, client: client.id });

    this.server.to(client.id).emit('message', message.message);
    this.server.to(message.SenderNumber).emit('message', message.message);
    // this.server.emit('message', message);
  }
}
