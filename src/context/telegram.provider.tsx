"use client";
import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { TelegramWebApps } from "telegram-webapps-types";

export const TelegramContext = createContext<TelegramWebApps.WebApp | any>({});
export const useTelegram = () => useContext(TelegramContext);

export const TelegramProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [webApp, setWebApp] = useState<TelegramWebApps.WebApp | any>({});

  useEffect(() => {
    const telegram = (window as any)?.Telegram?.WebApp;
    if (telegram) {
      telegram.ready();
      setWebApp(telegram);
    }
  }, []);

  const value = useMemo(() => {
    return webApp || {};
  }, [webApp]);

  //TODO
  // if (!webApp.platform) return null;

  // if (webApp.platform === "unknown" && process.env.NODE_ENV !== "development")
  //   return (
  //     <main className="wrapper">
  //       <h2>Not Allowed</h2>
  //       <p>
  //         This application is only available through the Telegram Bot
  //       </p>
  //       <a
  //         href="https://t.me/CoinFlipDevTGWebBot"
  //         rel="noreferrer"
  //         target="_blank"
  //       >
  //         @CoinFlipDevTGWebBot
  //       </a>
  //     </main>
  //   );

  return (
    <TelegramContext.Provider value={value}>
      {children}
    </TelegramContext.Provider>
  );
};
