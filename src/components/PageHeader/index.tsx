"use client";
import Image from "next/image";
import React from "react";
import CloseImage from "../../../public/Union.svg";
import "./index.css";
import Link from "next/link";

const PageHeader: React.FC<{ title: string }> = ({ title }) => {
  return (
    <div className="page-header-container">
      <div className="page-header-content">
        <h3 className="page-header-title">{title}</h3>
        <Link href={"/"} className="page-header-close-button">
          <Image alt="close" src={CloseImage} width={10} height={10} />
        </Link>
      </div>
    </div>
  );
};

export default PageHeader;
