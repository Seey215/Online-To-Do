import { SocketProvider } from "@/components/SocketProvider";
export default function Home() {
  return (
    <SocketProvider>
      <div>
        <h1>Hello World</h1>
      </div>
    </SocketProvider>
  );
}