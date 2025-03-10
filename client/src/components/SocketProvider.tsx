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

  // TODO 下一步：创建房间(fishboneId)进行 socket.io 通信
  useEffect(() => {
    const newSocket: Socket = io('http://localhost:3006');
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log(`[client.on.connect] socketId${newSocket.id};`);
    });
    newSocket.on('disconnect', () => {
      console.log('[client.on.disconnect]', newSocket.id); // undefined
    });

    newSocket.emit('socketTest', "客户端=》服务端");
    newSocket.on('socketTest', (data) => {
      console.log('接收到来自server的数据data:', data);
    });

    newSocket.emit("toServer", "[client.emit.server] Content");
    newSocket.on("toServer", (data) => {
      console.log("[client.on.toServer] 收到一条服务端=》客户端的消息：", data);
    });

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


/* 

No.1 步骤一：完成权限变动的即时编辑
No.2 步骤二：完成头像、权限、进出房间的实时编辑
No.3 步骤三：完成鱼骨图内容的实时编辑
No.4 步骤四：完成光标的实时编辑

*/