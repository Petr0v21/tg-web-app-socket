"use client";
import React, { useEffect, useState } from "react";
import "./index.css";
import Image from "next/image";
import CoinT from "../../../../../public/profile/CoinT.png";
import CoinH from "../../../../../public/profile/CoinH.png";
import Counter from "../../../../../public/profile/counter.png";
import Cup from "../../../../../public/profile/cup.png";
import Crown from "../../../../../public/profile/crown.png";
import Star from "../../../../../public/profile/star.png";
import { ProfileStatisticsType } from "@/utils/types";
import { userService } from "@/services/userService";

const ProfileStatistics: React.FC = () => {
  const [state, setState] = useState<ProfileStatisticsType>();
  useEffect(() => {
    userService.getMyStatistics().then((res) => {
      if (res) {
        setState(res);
      }
    });
  }, []);
  return (
    <div className="profile-statistics-container">
      <div className="profile-statistics-item">
        <Image
          alt="cup"
          src={Cup}
          width={80}
          height={80}
          className="profile-statistics-item-icon"
        />
        <div className="profile-statistics-item-content">
          <p className="profile-statistics-item-label">Winnings</p>
          <strong className="profile-statistics-item-value">
            {state?.winningBets ?? 0}
          </strong>
        </div>
      </div>
      <div className="profile-statistics-item">
        <Image
          alt="counter"
          src={Counter}
          width={68}
          height={78}
          className="profile-statistics-item-icon"
        />
        <div className="profile-statistics-item-content">
          <p className="profile-statistics-item-label">Total Bets</p>
          <strong className="profile-statistics-item-value">
            {state?.totalBets ?? 0}
          </strong>
        </div>
      </div>
      <div className="profile-statistics-item">
        <Image
          alt="coin-h"
          src={CoinH}
          width={72}
          height={72}
          className="profile-statistics-item-icon"
          style={{
            borderRadius: "50%",
            boxShadow: "0px 4px 72px 0px rgba(108, 86, 53, 1)",
          }}
        />
        <div className="profile-statistics-item-content">
          <p className="profile-statistics-item-label">Gold Side</p>
          <strong className="profile-statistics-item-value">
            {state?.headsGames ?? 0}
          </strong>
        </div>
      </div>
      <div className="profile-statistics-item">
        <Image
          alt="coin-t"
          src={CoinT}
          width={72}
          height={72}
          className="profile-statistics-item-icon"
          style={{
            borderRadius: "50%",
            boxShadow: " 0px 4px 72px 0px rgba(192, 192, 192, 0.5)",
          }}
        />
        <div className="profile-statistics-item-content">
          <p className="profile-statistics-item-label">Silver Side</p>
          <strong className="profile-statistics-item-value">
            {state?.tailsGames ?? 0}
          </strong>
        </div>
      </div>
      <div className="profile-statistics-item">
        <Image
          alt="crown"
          src={Crown}
          width={80}
          height={72}
          className="profile-statistics-item-icon"
        />
        <div className="profile-statistics-item-content">
          <p className="profile-statistics-item-label">Leaderboard Place</p>
          <strong className="profile-statistics-item-value">
            #{state?.leaderboardPlace ?? "-"}
          </strong>
        </div>
      </div>
      <div className="profile-statistics-item">
        <Image
          alt="star"
          src={Star}
          width={80}
          height={80}
          className="profile-statistics-item-icon"
        />
        <div className="profile-statistics-item-content">
          <p className="profile-statistics-item-label">Highest Double</p>
          <strong className="profile-statistics-item-value">
            ${state?.highestPayout ?? "-"}
          </strong>
        </div>
      </div>
    </div>
  );
};

export default ProfileStatistics;
