"use client";

import React from "react";
import "./index.css";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-nav-container">
        <span>HOW TO PLAY</span>
        <span>T&C</span>
        <span>AML</span>
        <span>KYC</span>
        <span>FAQ</span>
        <span>
          <Link href={"provably-fair"}>RESPOSIBLE GAMING</Link>
        </span>
      </div>
      <span className="footer-text">
        Degen Coin Flip is licensed and authorized by the Government of Curaçao.
        (Registration Number 163351). Company Address: Zuikertuintjeweg
        (Zuikertuin Tower), Willemstad, Curaçao.
      </span>
    </footer>
  );
};

export default Footer;
