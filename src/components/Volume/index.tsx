"use client";
import Image from "next/image";
import React from "react";
import VolumeIcon from "../../../public/volume.svg";
import "./index.css";

const VolumeButton: React.FC = () => {
  return (
    <div className="volume">
      <Image src={VolumeIcon} alt="volume" width={18} height={14} />
    </div>
  );
};

export default VolumeButton;
