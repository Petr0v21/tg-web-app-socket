"use client";
import Image from "next/image";
import React from "react";
import FrontRatio from "../../../public/coin/FrontRatio.svg";
import BackRatio from "../../../public/coin/BackRatio.svg";
import "./index.css";

const RatioOne: React.FC<{
  amount?: number;
  image: string;
}> = ({ amount, image }) => {
  return (
    <div className="ratio-container">
      <Image src={image} alt="ratioSide" width={36} height={36} />
      <div className="ratio-container-content">
        <span className="amount">{amount ?? "..."}</span>
        <span className="ratio-percent">{amount ?? "..."}%</span>
      </div>
    </div>
  );
};

const Ratio: React.FC<{
  frontPercent?: number;
  backPercent?: number;
  isMobile?: boolean;
}> = ({ backPercent, frontPercent, isMobile }) => {
  return (
    <div className={`ratio ${isMobile ? "ratio-mobile" : ""}`}>
      <span>Last Flips</span>
      <div
        className="ratio-container"
        style={
          isMobile
            ? {
                gap: "1.5em",
              }
            : undefined
        }
      >
        <RatioOne amount={frontPercent} image={FrontRatio} />
        <RatioOne amount={backPercent} image={BackRatio} />
      </div>
    </div>
  );
};

export default Ratio;
