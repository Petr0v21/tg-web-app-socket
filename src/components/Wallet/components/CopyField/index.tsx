"use client";
import React from "react";
import "./index.css";

const CopyField: React.FC<{ value: string }> = ({ value }) => {
  return (
    <div className="copy-field">
      <span className="copy-field-value">{value}</span>
      <div
        className="copy-field-button"
        onClick={() => {
          try {
            navigator.clipboard.writeText(value);
          } catch (err) {
            console.error(err);
          }
        }}
      />
    </div>
  );
};

export default CopyField;
