"use client";
import Image from "next/image";
import React from "react";
import PageHeader from "@/components/PageHeader";
import { useUser } from "@/context/user.provider";
import DafaultAvatarImage from "../../../public/avatar.svg";
import "./index.css";
import LevelBar from "./components/LevelBar";
import Statistics from "./components/Statistics";
import Transactions from "./components/Transactions";

const ProfileContent: React.FC = () => {
  const user = useUser();
  return (
    <>
      <PageHeader title="Your Profile" />
      <div className="profile-wrapper">
        <Image
          alt="avatar"
          src={user?.avatar ?? DafaultAvatarImage}
          width={180}
          height={180}
          className="profile-avatar"
        />
        <h2 className="profile-username">{user?.username}</h2>
        <LevelBar />
        <h5 className="profile-block-title">Statistics</h5>
        <Statistics />
      </div>
      <h5 className="profile-block-title">Transactions</h5>
      <Transactions />
    </>
  );
};

export default ProfileContent;
