"use client";

import React, { useEffect, useState } from "react";
import "./index.css";
import Pagination from "./components/Pagination";
import { GetTransactionsResponse, TransactionTypeEnum } from "@/utils/types";
import { paymentService } from "@/services/paymentService";
import Transaction from "./components/Transaction";

const LIST_PAGE_LENGTH = 6;

const Transactions: React.FC = () => {
  const [type, setType] = useState<TransactionTypeEnum>(
    TransactionTypeEnum.DEPOSIT
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [state, setState] = useState<GetTransactionsResponse>({
    totalPages: 1,
    transactions: [],
  });

  useEffect(() => {
    paymentService
      .getMyTransactions({
        type,
        skip: currentPage === 1 ? 0 : (currentPage - 1) * LIST_PAGE_LENGTH,
        take: LIST_PAGE_LENGTH,
      })
      .then((res) => {
        if (res) {
          setState(res);
        }
      });
  }, [currentPage, type]);
  return (
    <div className="transaction-container">
      <div className="transaction-choose-type-container">
        <div
          className={`transaction-type-button ${
            type === TransactionTypeEnum.DEPOSIT &&
            "transaction-type-button-primary"
          }`}
          onClick={() => setType(TransactionTypeEnum.DEPOSIT)}
        >
          <span>Deposit</span>
        </div>
        <div
          className={`transaction-type-button ${
            type === TransactionTypeEnum.WITHDRAW &&
            "transaction-type-button-primary"
          }`}
          onClick={() => setType(TransactionTypeEnum.WITHDRAW)}
        >
          <span>Withdraw</span>
        </div>
      </div>
      <div className="transaction-list">
        <div className="transaction-list-row">
          <span>ID</span>
          <span>Amount</span>
          <span>Currency</span>
          <span>Status</span>
          <span>USD</span>
          <span>Date</span>
        </div>
        <div className="transaction-list-separator" />
        {state.transactions.map((item) => (
          <Transaction {...item} key={item.id} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={state.totalPages ?? 1}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Transactions;
