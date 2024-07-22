"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Wallet: React.FC = () => {
  const nav = useRouter();
  useEffect(() => {
    nav.push("/wallet/deposit");
  }, [nav]);
  return <></>;
};

export default Wallet;
