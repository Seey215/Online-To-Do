import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { CreateSocketDto } from './dto/create-socket.dto';
import { UpdateSocketDto } from './dto/update-socket.dto';
import { SocketService } from './socket.service';
import { Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway(3006, {
  allowEIO3: true,
  cors: {
    // origin: process.env.NODE_ENV === 'production' ? 'https://your-production-domain.com' : 'http://localhost:3000',
    origin: 'http://localhost:3000',
    credentials: true,
  },
})
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(SocketGateway.name);
  constructor(
    private readonly socketService: SocketService,
  ) { }

  // 处理客户端连接事件
  handleConnection(client: Socket) {
    this.logger.log(`[server.on.connect]: 客户端已连接，socketId: ${client.id}`);
  }

  // 处理客户端断开连接事件
  handleDisconnect(client: Socket) {
    this.logger.log(`[server.on.disconnect]: 客户端已断开连接，socketId: ${client.id}`);
  }

  @SubscribeMessage('socketTest')
  socketTest(@ConnectedSocket() client: Socket, @MessageBody() data: string) {
    this.logger.warn(`[socketTest] 收到来自前端的消息：[${data}]`);
    client.emit('socketTest', `Server应答: ${data}`);
  }

  @SubscribeMessage('toServer')
  toServer(@ConnectedSocket() client: Socket, @MessageBody() data: string) {
    console.log(data);
    client.emit('toServer', '这是一条发送给客户端的消息');
  }

  @SubscribeMessage('createSocket')
  create(@MessageBody() createSocketDto: CreateSocketDto) {
    return this.socketService.create(createSocketDto);
  }

  @SubscribeMessage('findAllSocket')
  findAll() {
    return this.socketService.findAll();
  }

  @SubscribeMessage('findOneSocket')
  findOne(@MessageBody() id: number) {
    return this.socketService.findOne(id);
  }

  @SubscribeMessage('updateSocket')
  update(@MessageBody() updateSocketDto: UpdateSocketDto) {
    return this.socketService.update(updateSocketDto.id, updateSocketDto);
  }

  @SubscribeMessage('removeSocket')
  remove(@MessageBody() id: number) {
    return this.socketService.remove(id);
  }
}