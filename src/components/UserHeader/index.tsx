"use client";
import React from "react";
import EthImg from "../../../public/Eth.svg";
import Image from "next/image";
import DafaultAvatarImage from "../../../public/avatar.svg";
import { useUser } from "@/context/user.provider";
import "./index.css";
import Link from "next/link";
import { numberTransform } from "@/utils/numberTransform";

const UserHeader: React.FC = () => {
  const user = useUser();
  return (
    <div className="user-header-content">
      <div className="user-header-balance">
        <div className="user-header-balance-content">
          <Image
            alt="avatar"
            src={EthImg}
            width={24}
            height={24}
            className="user-header-balance-img"
          />
          <span className={`user-header-balance-amount`}>
            {numberTransform(user?.balance ?? 0)}
          </span>
        </div>
        <Link href={"/wallet"}>
          <div className="balace-add">
            <span>+</span>
          </div>
        </Link>
      </div>
      <Link href={"/profile"}>
        <Image
          alt="avatar"
          src={user?.avatar ?? DafaultAvatarImage}
          width={45}
          height={45}
          className="user-header-avatar"
        />
      </Link>
    </div>
  );
};

export default UserHeader;
