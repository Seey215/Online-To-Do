import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { CreateSocketDto } from './dto/create-socket.dto';
import { UpdateSocketDto } from './dto/update-socket.dto';
import { SocketService } from './socket.service';
import { Server, Socket } from 'socket.io';
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
  @WebSocketServer()
  server?: Server;

  private readonly logger = new Logger(SocketGateway.name);
  constructor(
    private readonly socketService: SocketService,
  ) { }

  private getClientInfo(client: Socket) {
    const reqUrl = client.request.url || '';
    const url = new URL(reqUrl, `http://${client.request.headers.host}`);
    const room = url.searchParams.get('room') || 'default';
    return { room };
  }

  // 处理客户端连接事件
  handleConnection(client: Socket) {
    const { room } = this.getClientInfo(client);
    client.join(room);
    this.logger.log(`[server.on.connect]: { socketId: ${client.id} join room: ${room} }`);
  }

  // 处理客户端断开连接事件
  handleDisconnect(client: Socket) {
    const { room } = this.getClientInfo(client);
    client.leave(room);
    this.logger.log(`[server.on.disconnect]: { socketId: ${client.id}, room: ${room} }`);
  }

  // 接收客户端发送的消息并广播给房间内其他客户端
  @SubscribeMessage('sendMessageToRoom')
  sendMessageToRoom(@ConnectedSocket() client: Socket, @MessageBody() { message }: { message: string }) {
    const { room } = this.getClientInfo(client);
    this.logger.warn(`[server.on.sendMessageToRoom]: 收到来自房间[${room}]的消息: ${message}`);
    this.server?.to(room).emit('roomMessage', { room, message }); // 广播给房间内其他客户端
    // client.emit('roomMessage', { room, message }); // 广播给房间内其他客户端
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