"use client";
import dynamic from "next/dynamic";
import React from "react";

const WalletContent = dynamic(() => import("../../components/Wallet"), {
  ssr: false,
});

export default function WalletLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <WalletContent>{children}</WalletContent>;
}
