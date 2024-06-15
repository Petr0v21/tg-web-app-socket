"use client";

import { io } from "socket.io-client";

console.log(
  "process.env.NEXT_PUBLIC_BACK_SOCKET_URL",
  process.env.NEXT_PUBLIC_BACK_SOCKET_URL
);

export const socket = io(
  process.env.NEXT_PUBLIC_BACK_SOCKET_URL ?? "http://localhost:4040",
  {
    transports: ["websocket"],
  }
);
