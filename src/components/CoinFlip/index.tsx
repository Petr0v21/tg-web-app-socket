"use client";
import React, { useState } from "react";
import "./index.css";
import { gameService } from "@/services/gameService";
import { useUser } from "@/context/user.provider";
import Ratio from "../Ratio";
import { useStatistics } from "@/context/statistics.provider";
import Fliper from "../Fliper";
import GameForm from "../GameForm";
import { CoinSide, GameBetFormType } from "@/utils/types";
import { showSide } from "@/utils/showSide";
import { validationFormGame } from "@/utils/coinFlipValidation";

const CoinFlip: React.FC = () => {
  const user = useUser();
  const statistics = useStatistics();
  const [bet, setBet] = useState<GameBetFormType>({
    amount: 0,
    side: CoinSide.HEADS,
  });

  const flipCoin = () => {
    try {
      validationFormGame(bet, user);
      gameService.play({ bet: bet.amount, side: bet.side }).then((res) => {
        if (!res) {
          return alert("Invalid data");
        }
        setBet({
          ...bet,
          isWon: res.game.isWon,
          inFlip: true,
        });
        setTimeout(() => {
          setBet((prev) => ({
            ...prev,
            inFlip: false,
          }));
        }, 3000);
      });
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="game">
      <Fliper side={showSide(bet)} />
      {bet.isWon === undefined && (
        <Ratio
          frontPercent={
            statistics?.ratioSides ? statistics?.ratioSides[0] : undefined
          }
          backPercent={
            statistics?.ratioSides ? statistics?.ratioSides[1] : undefined
          }
          isMobile
        />
      )}
      <GameForm bet={bet} setBet={setBet} formHandler={flipCoin} user={user} />
    </div>
  );
};

export default CoinFlip;
