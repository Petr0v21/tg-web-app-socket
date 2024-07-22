"use client";
import React from "react";
import "./index.css";

const Total: React.FC<{
  activeClients?: number;
  house?: number;
}> = ({ activeClients, house }) => {
  return (
    <div className="total">
      <div className="total-content">
        Fliping Now:
        {activeClients !== undefined ? (
          <span className="amount">{activeClients}</span>
        ) : (
          "calculating..."
        )}
      </div>
      <div className="total-content">
        House:
        {house ? (
          <span className="total-house-amount amount currency">
            +{house.toLocaleString("de-DE")}
          </span>
        ) : (
          "calculating..."
        )}
      </div>
    </div>
  );
};

export default Total;
