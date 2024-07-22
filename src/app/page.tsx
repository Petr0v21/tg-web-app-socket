import React from "react";
import Header from "@/components/GeneralHeader";
import CoinFlip from "@/components/CoinFlip";
import Image from "next/image";
import Title from "../../public/title.png";
import LeaderBoard from "@/components/LeaderBoard";
import "./page.css";
import LightsWrapper from "@/components/LightsWrapper";
import Footer from "@/components/Footer";
import History from "@/components/History";
import { useStatistics } from "@/context/statistics.provider";

const Home: React.FC = () => {
  return (
    <>
      <LightsWrapper lightNumber={16}>
        <div className="main-container background-image">
          <div className="main-content wrapper">
            <Header />
            <Image alt="title" src={Title} className="main-title" />
            <CoinFlip />
          </div>
        </div>
      </LightsWrapper>
      <History />
      <LeaderBoard />
      <Footer />
    </>
  );
};

export default Home;
