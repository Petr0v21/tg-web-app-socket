"use client";

import { useEffect, useState } from "react";
import { socket } from "../socket";

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");

  const [state, setState] = useState<string[]>([]);
  const [users, setUsers] = useState<number>(0);

  useEffect(() => {
    console.log(socket);
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });

      socket.on("updateActiveClients", (args) => {
        console.log("updateActiveClients", args);
        setUsers(args);
      });
      socket.on("receiveMessage", (args) => {
        console.log("receiveMessage", args);
        setState((prev) => [...prev, JSON.stringify(args)]);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("updateActiveClients");
      socket.off("updateActiveClients");
    };
  }, []);

  return (
    <div>
      <p>Status: {isConnected ? "connected" : "disconnected"}</p>
      <p>Transport: {transport}</p>
      <span>USERS: {users}</span>
      <div>
        {state.map((item, idx) => (
          <span key={item + idx}>{item}</span>
        ))}
      </div>
      <button
        onClick={() => {
          socket.emit("sendMessage", "test message button" + socket.id);
        }}
      >
        Button
      </button>
    </div>
  );
}
