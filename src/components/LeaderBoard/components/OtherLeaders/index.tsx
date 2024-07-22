"use client";
import React from "react";
import "./index.css";
import { Leader } from "@/utils/types";
import DafaultAvatarImage from "../../../../../public/avatar.svg";
import Image from "next/image";
import { timeAgo } from "@/utils/timeAgo";
import { numberTransform } from "@/utils/numberTransform";

const OtherLeaders: React.FC<{ leaders: Leader[] }> = ({ leaders }) => {
  return (
    <div className="other-leaders">
      <div className="other-leaders-container">
        <h4 className="other-leaders-title">
          <span>other</span> <strong>leaders</strong>
        </h4>
        <div className="other-leaders-list">
          <div className="other-leaders-row other-leaders-row-naming">
            <div>User</div>
            <div id="other-leaders-net-gains">Net Gains</div>
            <div id="other-leaders-last-flip">Last flip</div>
            <div>Reward</div>
          </div>
          {leaders.map((item, idx) => (
            <div
              className="other-leaders-row-content other-leaders-row"
              key={idx + "other-leaders-row"}
            >
              <div className="other-leaders-item-main">
                <Image
                  alt="avatar"
                  src={item.user?.avatar ?? DafaultAvatarImage}
                  width={36}
                  height={36}
                />
                <span>{item.user?.username}</span>
              </div>
              <div id="other-leaders-net-gains">
                <span className="currency">+{item.amount}</span>
              </div>
              <div id="other-leaders-last-flip">
                {timeAgo(new Date(item.updatedAt))}
              </div>
              <div>
                <span className="currency">
                  {item.reward?.amount
                    ? numberTransform(item.reward?.amount)
                    : "-"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="leaders-show-button">
        <span>Show leaderboard</span>
      </div>
    </div>
  );
};

export default OtherLeaders;
