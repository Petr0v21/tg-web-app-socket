"use client";
import { userService } from "@/services/userService";
import { wsService } from "@/services/wsService";
import { EventType, LigaEnum, User, UserLevel } from "@/utils/types";
import { createContext, useContext, useState, useEffect, useMemo } from "react";

export const UserContext = createContext<User | undefined>(undefined);
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    userService.getMe().then((res) => {
      setUser(res ?? undefined);
    });
  }, []);

  useEffect(() => {
    if (user?.id) {
      wsService.socket?.on(
        EventType.UpdateUserBalance + user.id,
        ({
          id,
          ...data
        }: {
          id: string;
          balance: number;
          exp: number;
          level: number;
          liga: LigaEnum;
          nextLevel: UserLevel;
        }) => {
          setTimeout(
            () =>
              setUser({
                ...user,
                ...data,
              }),
            3000
          );
        }
      );
      return () => {
        wsService.socket?.off(EventType.UpdateUserBalance);
      };
    }
  }, [user]);

  const value = useMemo(() => {
    return user || undefined;
  }, [user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
