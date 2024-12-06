import  {WebSocketGateway,SubscribeMessage,WebSocketServer,MessageBody} from "@nestjs/websockets"
import { OnModuleInit, UseInterceptors } from '@nestjs/common';
import {Server} from 'socket.io'
import { ExamPle } from '../../Interceptores/example.intercepot';
import { JWTAuthService } from '../../modules/utlis/JWTAuthServicer.service';
@WebSocketGateway()
export class ChatGateway implements OnModuleInit {
  constructor(private readonly JwtAuthService: JWTAuthService) {
  }
  @WebSocketServer()
  server: Server;
  onModuleInit(): any {
    this.server.on('connection', (client) =>

      console.log(`connection connected: ${client.id}`),
    );
  }
  @SubscribeMessage('newSentMessage')
  handleEvent(@MessageBody() data: string): string {
    this.server.emit('newSentMessage', data);
    return data;
  }
// @UseInterceptors(ExamPle)
  @SubscribeMessage('privateChatMessage')
  privateChatMessage(
    @MessageBody() data: { targetClientId: string; messageInterface: string },
  ) {
    this.server.to(data.targetClientId).emit('privateChatMessage', data);
    console.log(data)
  }

}
