"use client";
import React from "react";
import "./index.css";
import { CoinSide, GameFormType } from "@/utils/types";

const SideSelect: React.FC<Omit<GameFormType, "formHandler" | "user">> = ({
  bet,
  setBet,
}) => {
  return (
    <div className="side-swicth-container">
      <h4>Choose your side</h4>
      <div className="side-swicth">
        <span
          className={`side-swicth-element ${
            bet.side === CoinSide.HEADS
              ? "side-swicth-element-choosed side-swicth-element-choosed-heads"
              : "undefined"
          }`}
          onClick={() => {
            setBet({
              ...bet,
              side: CoinSide.HEADS,
            });
          }}
        >
          GOLD
        </span>
        <span
          className={`side-swicth-element ${
            bet.side === CoinSide.TAILS
              ? "side-swicth-element-choosed side-swicth-element-choosed-tails"
              : "undefined"
          }`}
          onClick={() => {
            setBet({
              ...bet,
              side: CoinSide.TAILS,
            });
          }}
        >
          SILVER
        </span>
      </div>
    </div>
  );
};

export default SideSelect;
