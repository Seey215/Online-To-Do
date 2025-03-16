'use client';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import io, { Socket } from 'socket.io-client';

interface SocketContextType {
  socket: Socket | null;
}

const SocketContext = createContext<SocketContextType>({ socket: null });
// export const useSocket = () => useContext(SocketContext);
export const SocketProvider = ({ children, fishboneId: room }: { children: ReactNode; fishboneId: string }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  // TODO 下一步：创建房间(fishboneId)进行 socket.io 通信
  useEffect(() => {
    const newSocket: Socket = io(`http://localhost:3006?room=${room}`);
    setSocket(newSocket);

    // const room = fishboneId;
    newSocket.on('connect', () => {
      console.log(`[client.on.connect] socketId: ${newSocket.id};`);
    });
    newSocket.on('disconnect', (reason) => {
      console.log(`[client.on.connect] socketId: ${newSocket.id} disconnected due to ${reason}`);
    });

    // newSocket.emit('joinRoom', { room, user: "userId:123abcef" });
    // newSocket.on('joinRoom', (data)=>{
    //   console.log(`[client.on.joinRoom]: 用户[${data}]`);
    // })

    // 监听房间消息
    newSocket.on('roomMessage', (data) => {
      console.log('[client.on.roomMessage]', data);
    });

    return () => {
      newSocket.off('connect');
      newSocket.off('disconnect');
      newSocket.off('joinRoom');
      newSocket.off('roomMessage');
      newSocket.close();
    };
  }, [room]); // 空依赖数组确保只在组件加载时执行一次

  const sendMessageToRoom = (message: string) => {
    if (socket) {
      console.log('[client.sendMessageToRoom] 发送了进入房间的消息');
      socket.emit('sendMessageToRoom', { message });
    }
  }

  sendMessageToRoom(`userId[123abcef] join Room[${room}]`);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
