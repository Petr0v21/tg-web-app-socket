"use client";
import React, { useEffect, useState } from "react";
import "./index.css";
import { userService } from "@/services/userService";
import { ProvablyFairDto } from "@/utils/types";
import PageHeader from "../PageHeader";

const Field: React.FC<{ label: string; value?: string | number }> = ({
  label,
  value,
}) => {
  return (
    <div className="field-container">
      <p className="field-label">{label}</p>
      <div className="field">
        <span>{value}</span>
      </div>
    </div>
  );
};

const ProvablyFair: React.FC = () => {
  const [state, setState] = useState<ProvablyFairDto>();
  useEffect(() => {
    userService.getCurrentSeeds().then((res) => {
      if (res) {
        setState(res);
      }
    });
  }, []);
  return (
    <>
      <PageHeader title="Provably Fair" />

      <div className="provably-fair-container">
        <div className="provably-fair-title">
          <h2>Coinflip Provably Fair Information</h2>
          <p className="provably-fair-subtitle">
            You can find out more about our provable honesty on the{" "}
            <span>Justice</span> page.
          </p>
        </div>
        <div className="provably-fair-content">
          <Field label="Client Seed" value={state?.clientSeed} />
          <Field label="Server seed" value={state?.serverSeed} />
          <Field label="Nonce" value={state?.nonce} />
        </div>
      </div>
    </>
  );
};

export default ProvablyFair;
