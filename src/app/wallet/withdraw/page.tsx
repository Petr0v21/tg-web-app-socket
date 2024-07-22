import dynamic from "next/dynamic";
import React from "react";

const WalletWithdraw = dynamic(
  () => import("../../../components/Wallet/components/Withdraw"),
  {
    ssr: false,
  }
);

const WalletWithdrawPage: React.FC = () => {
  return <WalletWithdraw />;
};

export default WalletWithdrawPage;
