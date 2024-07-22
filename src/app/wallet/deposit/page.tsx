import dynamic from "next/dynamic";
import React from "react";

const WalletDeposit = dynamic(
  () => import("../../../components/Wallet/components/Deposit"),
  {
    ssr: false,
  }
);

const WalletDepositPage: React.FC = () => {
  return <WalletDeposit />;
};

export default WalletDepositPage;
