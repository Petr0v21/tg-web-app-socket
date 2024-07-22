"use client";
import React from "react";
import "./index.css";
import UserHeader from "../UserHeader";
import Total from "../Total";
import Ratio from "../Ratio";
import { useStatistics } from "@/context/statistics.provider";
import VolumeButton from "../Volume";
import { mockData } from "@/utils/mockData";

const Header: React.FC = () => {
  const statistics = useStatistics();
  return (
    <header className="header-container">
      <div className="main-header">
        <Total
          activeClients={statistics?.activeClients ?? mockData.activeClients}
          house={statistics?.house ?? mockData.house}
        />
        <div className="main-user-header">
          <UserHeader />
        </div>
        <Ratio
          frontPercent={
            statistics?.ratioSides
              ? statistics?.ratioSides[0]
              : mockData.ratioSides[0]
          }
          backPercent={
            statistics?.ratioSides
              ? statistics?.ratioSides[1]
              : mockData.ratioSides[1]
          }
        />
      </div>
      <div className="second-header">
        <VolumeButton />
        <UserHeader />
      </div>
    </header>
  );
};

export default Header;
