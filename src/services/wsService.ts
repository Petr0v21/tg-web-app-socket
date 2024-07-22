"use client";
import { io } from "socket.io-client";
import { query, createQueryBody } from "./graphqlService";
import { ActiveClientsType } from "@/utils/types";

const getMeBaseQueryBody = `
query getActiveClients {
  getActiveClients { 
  $output
}}`;

export class WsService {
  socket =
    window !== undefined
      ? io(process.env.NEXT_PUBLIC_BACK_SOCKET_URL!, {
          transports: ["websocket"],
          query: {
            "key-token":
              process.env.NODE_ENV === "development"
                ? process.env.NEXT_PUBLIC_TELEGRAM_INIT_DATA
                : (window as any)?.Telegram.WebApp.initData,
          },
          autoConnect: false,
        })
      : undefined;

  async getActiveClients() {
    const res = await query(
      createQueryBody(getMeBaseQueryBody, {
        activeClients: true,
      }),
      null
    );
    return res as ActiveClientsType;
  }
}

export const wsService = new WsService();
