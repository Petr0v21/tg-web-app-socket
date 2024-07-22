"use client";
import React, { useEffect } from "react";
import { UserProvider } from "@/context/user.provider";
import { TelegramProvider } from "../context/telegram.provider";
import { StatisticsProvider } from "@/context/statistics.provider";
import { wsService } from "@/services/wsService";
import ModalProvider from "@/context/modal.provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    wsService.socket?.connect();
    return () => {
      wsService.socket?.disconnect();
    };
  });
  return (
    <TelegramProvider>
      <UserProvider>
        <ModalProvider>
          <StatisticsProvider>{children}</StatisticsProvider>
        </ModalProvider>
      </UserProvider>
    </TelegramProvider>
  );
}
