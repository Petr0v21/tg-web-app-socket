"use client";

import React from "react";
import { TransactionType, TransactionTypeEnum } from "@/utils/types";

const Transaction: React.FC<TransactionType> = ({
  id,
  amount,
  currency,
  createdAt,
  type,
  status,
  usdAmount,
}) => {
  return (
    <div
      className="transaction-list-row transaction-content-row"
      key={"transaction-" + id}
    >
      <span>{id}</span>
      <div className="transaction-row-separator" />
      <span>{amount}</span>
      <div className="transaction-row-separator" />
      <span>{currency}</span>
      <div className="transaction-row-separator" />
      <span>{status}</span>
      <div className="transaction-row-separator" />
      <span>
        {
          <strong
            style={{
              color:
                type === TransactionTypeEnum.DEPOSIT
                  ? "rgba(94, 221, 107, 1)"
                  : "red",
            }}
          >
            {type === TransactionTypeEnum.DEPOSIT ? "+" : "-"}
          </strong>
        }
        ${usdAmount?.toFixed(2)}
      </span>
      <div className="transaction-row-separator" />
      <span>
        {new Date(createdAt).toISOString().slice(0, 16).replace("T", " ")}
      </span>
    </div>
  );
};

export default Transaction;
