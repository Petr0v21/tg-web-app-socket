"use client";
import PageHeader from "@/components/PageHeader";
import React from "react";
import "./index.css";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { numberTransform } from "@/utils/numberTransform";

export const CurrencyAmountDetails: React.FC<{
  text: string;
  currencyImg: string | StaticImageData;
  amount: number;
}> = ({ text, amount, currencyImg }) => {
  return (
    <div className="wallet-currency-amount-details">
      <span>{text}</span>
      <Image alt="currency" src={currencyImg} width={24} height={24} />
      <strong>{numberTransform(amount)}</strong>
    </div>
  );
};

const Wallet: React.FC<React.PropsWithChildren> = ({ children }) => {
  const pathname = usePathname();
  return (
    <>
      <PageHeader title="Your Wallet" />
      <div className="your-wallet-container">
        <div className="transaction-choose-type-container">
          <Link
            href={"/wallet/deposit"}
            className={`transaction-type-button ${
              pathname.includes("deposit") && "transaction-type-button-primary"
            }`}
          >
            <span>Deposit</span>
          </Link>
          <Link
            href={"/wallet/withdraw"}
            className={`transaction-type-button ${
              pathname.includes("withdraw") && "transaction-type-button-primary"
            }`}
          >
            <span>Withdraw</span>
          </Link>
        </div>
        <>{children}</>
      </div>
    </>
  );
};

export default Wallet;
