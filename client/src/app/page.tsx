import { SocketProvider } from "@/components/SocketProvider";
export default function Home() {
  const fishboneId = 'fishboneId:custom';

  return (
    // <SocketProvider fishboneId={fishboneId}>
      <div>
        <h1>Hello World</h1>
      </div>
    // </SocketProvider>
  );
}