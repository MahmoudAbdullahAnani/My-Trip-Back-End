import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';

import { Server, Socket } from 'socket.io';
@WebSocketGateway({
  cors: {
    origin: [
      'http://localhost:3001',
      'https://my-trip-back-end.onrender.com',
      'https://ittrip.vercel.app',
      '*',
    ],
  },
})
export class ChatGateway {
  constructor(private readonly chatService: ChatService) {}

  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      const userId = socket.handshake.query.userIdDB;
      this.chatService.insertClientId(userId, socket.id);
      this.server.emit('userId', socket.id);
    });
  }

  @SubscribeMessage('message')
  create(@ConnectedSocket() client: Socket, @MessageBody() message): void {
    const userId = client.handshake.query.userIdDB;

    console.log({ message, client: client.id, userId });
    const data = { message, client: client.id, userId };
    // this.chatService.insertClientId(userId, client.id);
    this.server.to(client.id).emit('message', data);
    this.server.to(message.SenderNumber).emit('message', data);
    // this.server.emit('message', message);
  }
}
