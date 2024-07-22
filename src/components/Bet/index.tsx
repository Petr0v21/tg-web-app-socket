"use client";

import React from "react";
import "./index.css";
import Image from "next/image";
import Eth from "../../../public/Eth.svg";
import { GameFormType, User } from "@/utils/types";
import { BetAmountPropsType } from "@/utils/types";
import { numberTransform } from "@/utils/numberTransform";

export const BetAmountButton: React.FC<
  BetAmountPropsType & {
    amount: number;
  }
> = ({ amount, betAmount, setBetAmount }) => {
  return (
    <span
      className="game-bet-amount"
      id={betAmount === amount ? "bet-active" : undefined}
      onClick={() => setBetAmount(amount)}
    >
      {amount.toFixed(2)}Eth
    </span>
  );
};

export const BetInput: React.FC<
  Omit<GameFormType, "formHandler"> & { user?: User }
> = ({ bet, setBet, user }) => {
  const percentButtonHandler = (balance: number, percent: number) => {
    return () => {
      setBet((prev) => ({
        ...prev,
        amount: balance / percent,
      }));
    };
  };
  return (
    <div className="custom-input">
      <div className="custom-input-part">
        <Image src={Eth} alt="Eth" width={24} height={24} />
        <input
          className="custom-input-field"
          type="number"
          value={bet.amount.toString()}
          onChange={(e) => {
            const value = Number(e.target.value);
            if (value >= 0 && value <= 1000000)
              setBet((prev) => ({
                ...prev,
                amount: value,
              }));
          }}
        />
      </div>
      <div className="custom-input-part">
        <BetButtonPercent
          handler={percentButtonHandler(user?.balance ?? 0, 4)}
          amountPercent={4}
        />
        <BetButtonPercent
          handler={percentButtonHandler(user?.balance ?? 0, 2)}
          amountPercent={2}
        />
        <BetButtonPercent
          handler={percentButtonHandler(user?.balance ?? 0, 1)}
          amountPercent={1}
        />
      </div>
    </div>
  );
};

export const BetButtonPercent: React.FC<{
  amountPercent: number;
  handler: () => void;
}> = ({ amountPercent, handler }) => {
  return (
    <button className="custom-input-part-button" onClick={handler}>
      {100 / amountPercent}%
    </button>
  );
};
