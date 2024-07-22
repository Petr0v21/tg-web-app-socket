"use client";
import React from "react";
import "./index.css";
import { BetAmountButton, BetInput } from "../Bet";
import SideSelect from "../SideSelect";
import { CoinSide, GameBetFormType, GameFormType } from "@/utils/types";
import Image from "next/image";
import CoinFrontImage from "../../../public/coin/CoinFront.svg";
import CoinBackImage from "../../../public/coin/CoinBack.svg";
import Eth from "../../../public/Eth.svg";
import { numberTransform } from "@/utils/numberTransform";

export const GameResult: React.FC<{
  bet: GameBetFormType;
  type: "FLIPPING" | "WIN" | "LOSE";
}> = ({ bet, type }) => {
  return (
    <div className="game-form-result">
      <h4
        className={
          type === "FLIPPING"
            ? ""
            : type === "WIN"
            ? "result-win"
            : "result-lose"
        }
      >
        {type === "FLIPPING"
          ? "Flipping..."
          : type === "WIN"
          ? "you win"
          : "You Lose"}
      </h4>
      <div className="game-form-result-details">
        <div className=" game-form-result-part">
          <span className="game-form-result-part-label">Chosen side</span>
          <div className="game-form-result-container">
            <Image
              alt="coin"
              src={bet.side === CoinSide.HEADS ? CoinFrontImage : CoinBackImage}
              width={24}
              height={24}
            />
            <span
              className={`game-form-chosen-side ${
                bet.side === CoinSide.HEADS ? "gold" : "silver"
              }`}
            >
              {bet.side === CoinSide.HEADS ? "Golden" : "Silver"}
            </span>
          </div>
        </div>
        <div className="game-form-result-part">
          <span className="game-form-result-part-label">Bet amount</span>
          <div className="game-form-result-container">
            <Image alt="value" src={Eth} width={24} height={24} />
            <span
              className={`game-form-bet-amount ${
                type === "FLIPPING"
                  ? ""
                  : type === "WIN"
                  ? "result-win"
                  : "result-lose"
              }`}
            >
              {type === "FLIPPING" ? "" : type === "WIN" ? "+" : "-"}
              {numberTransform(bet.amount)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const GameForm: React.FC<GameFormType> = ({
  bet,
  setBet,
  formHandler,
  user,
}) => {
  const setBetAmount = (amount: number) => {
    setBet({
      ...bet,
      amount,
    });
  };

  const getStatusClass = () => {
    bet.inFlip
      ? "game-form-button-flipping"
      : bet.isWon === undefined
      ? ""
      : bet.side === CoinSide.HEADS && bet.isWon
      ? "button-gold"
      : "button-silver";
    if (bet.inFlip) {
      return "game-form-button-flipping";
    } else if (bet.isWon === undefined) {
      return undefined;
    } else {
      if (bet.side === CoinSide.HEADS) {
        return bet.isWon ? "button-gold" : "button-silver";
      } else {
        return bet.isWon ? "button-silver" : "button-gold";
      }
    }
  };

  return (
    <div className="game-form">
      {bet.isWon === undefined ? (
        <div className="game-form-container">
          <div className="game-form-row">
            <SideSelect bet={bet} setBet={setBet} />
          </div>
          <h4>Bet amount</h4>
          <div className="game-form-row">
            <BetInput bet={bet} setBet={setBet} user={user} />
          </div>
          <div className="game-form-row">
            <BetAmountButton
              amount={2}
              setBetAmount={setBetAmount}
              betAmount={bet.amount}
            />
            <BetAmountButton
              amount={5}
              setBetAmount={setBetAmount}
              betAmount={bet.amount}
            />
            <BetAmountButton
              amount={10}
              setBetAmount={setBetAmount}
              betAmount={bet.amount}
            />
          </div>
          <div className="game-form-row">
            <BetAmountButton
              amount={25}
              setBetAmount={setBetAmount}
              betAmount={bet.amount}
            />
            <BetAmountButton
              amount={50}
              setBetAmount={setBetAmount}
              betAmount={bet.amount}
            />
            <BetAmountButton
              amount={100}
              setBetAmount={setBetAmount}
              betAmount={bet.amount}
            />
          </div>
        </div>
      ) : (
        <GameResult
          bet={bet}
          type={bet.inFlip ? "FLIPPING" : bet.isWon! ? "WIN" : "LOSE"}
        />
      )}
      <button
        className={`
        game-form-button
          ${getStatusClass()}
        `}
        onClick={(e) => {
          e.preventDefault();
          if (bet.isWon === undefined) {
            formHandler();
          } else {
            setBet({
              amount: 0,
              side: CoinSide.HEADS,
            });
          }
        }}
      >
        <span>
          {bet.isWon === undefined || bet.inFlip
            ? "DOUBLE OR NOTHING"
            : bet.isWon
            ? "DOUBLED"
            : "NOTHING"}
        </span>
      </button>
    </div>
  );
};

export default GameForm;
