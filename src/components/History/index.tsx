"use client";
import React, { useContext } from "react";
import "./index.css";
import Image from "next/image";
import DafaultAvatarImage from "../../../public/avatar.svg";
import { numberTransform } from "@/utils/numberTransform";
import { GameDto } from "@/utils/types";
import { StatisticsContext } from "@/context/statistics.provider";

const History: React.FC<{ games?: GameDto[] }> = () => {
  const context = useContext(StatisticsContext);
  return (
    <div className="history wrapper">
      <h4>
        <span>Recent</span>
        <strong>plays</strong>
      </h4>
      <div className="history-container">
        <div className="list-content-container">
          <div className="list-content">
            {context?.games?.map(
              ({ id, isWon, User: { avatar, username }, bet: { amount } }) => (
                <div className="list-item" key={id}>
                  <Image
                    alt="avatar"
                    src={avatar ?? DafaultAvatarImage}
                    width={32}
                    height={32}
                  />
                  <p>
                    <span className="list-item-username">{username}</span>{" "}
                    Flliped {numberTransform(amount)} Eth and{" "}
                    {isWon ? (
                      <span className="result-win">Double</span>
                    ) : (
                      <span className="result-lose">Got rugged</span>
                    )}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
