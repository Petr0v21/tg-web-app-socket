"use client";
import React from "react";
import Image from "next/image";
import "./index.css";
import DafaultAvatarImage from "../../../../../public/avatar.svg";
import { Leader } from "@/utils/types";
import { timeAgo } from "@/utils/timeAgo";
import { numberTransform } from "@/utils/numberTransform";

const LeaderComponent: React.FC<Leader & { index: number }> = ({
  index,
  amount,
  updatedAt,
  reward,
  user,
}) => {
  return (
    <div
      className={`leader leader-column-content ${
        index !== 1
          ? "leader-second-row" + " grid-area-" + index
          : "grid-area-" + index
      }`}
    >
      <div className="leader-top">
        <div className="leader-image-container">
          <div className="leader-index">
            <span>{index}</span>
          </div>
          <Image
            alt="avatar"
            src={user?.avatar ?? DafaultAvatarImage}
            width={148}
            height={148}
            className="leader-avatar"
          />
        </div>
        <span className="leader-username">{user?.username}</span>
      </div>
      <div className="leader-details">
        <div className="leader-details-info">
          <div className="leader-column-content leader-details-info-content">
            <span>Net Gains</span>
            <strong className="currency">{numberTransform(amount)}</strong>
          </div>
          <div className="leader-details-info-column-separator" />
          <div className="leader-column-content leader-details-info-content">
            <span> Last flip</span>
            <strong>{timeAgo(new Date(updatedAt))}</strong>
          </div>
        </div>
        <div className="leader-details-reward leader-column-content">
          <span>Reward</span>
          <strong>{reward?.amount ?? 0}ETH</strong>
        </div>
      </div>
    </div>
  );
};

export default LeaderComponent;
