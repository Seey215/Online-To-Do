'use client';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import io, { Socket } from 'socket.io-client';

interface SocketContextType {
  socket: Socket | null;
}

const SocketContext = createContext<SocketContextType>({ socket: null });
export const useSocket = () => useContext(SocketContext);
export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // 初始化 socket.io 连接
    const newSocket: Socket = io('http://localhost:3006');
    setSocket(newSocket);

    // 监听连接事件
    newSocket.on('connect', () => {
      console.log(`[client.on.connect] socketId${newSocket.id};`);
    });

    // 发送和接收消息
    newSocket.emit('socketTest', "客户端=》服务端");
    newSocket.on('socketTest', (data) => {
      console.log('接收到来自server的数据data:', data);
    });

    newSocket.emit("toServer", "这是一条客户端=》服务端的消息");
    newSocket.on("toServer", (data) => {
      console.log("[client.on.toServer] 收到一条服务端=》客户端的消息：", data);
    });

    newSocket.on('disconnect', () => {
      console.log('[client.on.disconnect]', newSocket.id);
    });

    // 清理函数，移除事件监听器并关闭连接
    return () => {
      newSocket.off('connect');
      newSocket.off('socketTest');
      newSocket.off('toServer');
      newSocket.close();
    };
  }, []); // 空依赖数组确保只在组件加载时执行一次

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};