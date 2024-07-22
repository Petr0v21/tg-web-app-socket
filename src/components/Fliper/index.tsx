"use client";
import Image from "next/image";
import React from "react";
import CoinFrontImage from "../../../public/coin/CoinFront.svg";
import CoinBackImage from "../../../public/coin/CoinBack.svg";
import "./index.css";

const Fliper: React.FC<{ side?: string }> = ({ side }) => {
  return (
    <div className="coin-image-container">
      <div className="coin-fliper">
        <div id="coin" className={side}>
          <div className="side-a">
            <Image alt="coin" src={CoinFrontImage} width={240} height={240} />
          </div>
          <div className="side-b">
            <Image alt="coin" src={CoinBackImage} width={240} height={240} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fliper;
