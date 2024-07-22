"use client";
import { gameService } from "@/services/gameService";
import { createContext, useContext, useState, useEffect } from "react";
import { wsService } from "@/services/wsService";
import { EventType, StatisticsType } from "@/utils/types";

export const StatisticsContext = createContext<
  Partial<StatisticsType> | undefined
>(undefined);
export const useStatistics = () => useContext(StatisticsContext);

export const StatisticsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [statistics, setStatistics] = useState<Partial<StatisticsType>>({});

  useEffect(() => {
    gameService;
    wsService.socket?.on(
      EventType.UpdateHistory,
      (data: Omit<StatisticsType, "activeClients">) => {
        setTimeout(
          () =>
            setStatistics((prev) => ({
              ...prev,
              ...data,
            })),
          data.clientId ? 0 : 3000
        );
      }
    );

    wsService.socket?.on(
      EventType.UpdateActiveClients,
      (data: Pick<StatisticsType, "activeClients">) => {
        setStatistics((prev) => ({
          ...prev,
          ...data,
        }));
      }
    );
    return () => {
      wsService.socket?.off(EventType.UpdateHistory);
      wsService.socket?.off(EventType.UpdateActiveClients);
    };
  }, [statistics]);

  return (
    <StatisticsContext.Provider value={statistics}>
      {children}
    </StatisticsContext.Provider>
  );
};
