"use client";
import React, { useState } from "react";
import "./index.css";
import SelectComponent, { SelectItemType } from "../Select";
import Eth from "../../../../../public/Eth.svg";
import Usdt from "../../../../../public/USDT.svg";
import Ton from "../../../../../public/TON.png";
import Coin from "../../../../../public/coin/CoinFront.svg";
import CopyField from "../CopyField";
import Image from "next/image";
import { CurrencyAmountDetails } from "../..";
import { paymentService } from "@/services/paymentService";
import { DepositResult } from "@/utils/types";

const mockDepositData: {
  currency: SelectItemType[];
  network: string[];
} = {
  currency: [
    {
      value: "ETH",
      image: Eth,
    },
    {
      value: "USDTTRC20",
      image: Usdt,
    },
    {
      value: "TON",
      image: Ton,
    },
  ],
  network: ["TON", "ETH"],
};

const MAX_BET = 1000000;
const MIN_BET = 10;

const Deposit: React.FC = () => {
  const [result, setResult] = useState<DepositResult>();
  const [state, setState] = useState<{
    currency: string;
    amount: number;
  }>({
    currency: "ETH",
    amount: 0,
  });
  const [error, setError] = useState<string>();

  const validation = () => {
    if (!state.amount || state.amount < MIN_BET) {
      setError("Amount required and must be more than MIN_BET");
      return false;
    }
    return true;
  };

  if (result?.address) {
    return (
      <>
        <div className="wallet-type-details-container">
          <p>Amount: {result.exchangeRate}</p>
        </div>
        <div className="wallet-type-details-container">
          <p className="wallet-subtitle">Deposit via blockchain</p>
          <span className="wallet-type-details">
            Direct deposits via the blockchain can take up to 10 minutes. Please
            be patient
          </span>
          <span className="wallet-type-details">
            Your personal USDT address for replenishment
          </span>
        </div>
        <CopyField value={result.address} />
        <div className="deposit-advice">
          <div>
            <p className="deposit-advice-icon">!</p>
          </div>
          <span>Please check the deposit wallet address carefully!</span>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="wallet-choose-container">
        <p className="wallet-subtitle">Choose currency</p>
        <SelectComponent
          choosed={
            mockDepositData.currency.find(
              ({ value }) => value === state.currency
            )!
          }
          list={mockDepositData.currency.filter(
            ({ value }) => value !== state.currency
          )}
          chooseHandler={(value) => {
            setState((prev) => ({
              ...prev,
              currency: value,
            }));
          }}
        />
      </div>
      <div className="wallet-input-amount-container">
        <p className="wallet-subtitle">Deposit amount</p>
        <div className={`custom-input ${error && "input-invalid"}`}>
          <div className="custom-input-part">
            <Image src={Coin} alt="Eth" width={24} height={24} />
            <input
              className="custom-input-field"
              value={state.amount.toString()}
              type="number"
              min={0}
              max={MAX_BET}
              onChange={(e) => {
                if (error) {
                  setError(undefined);
                }
                if (Number(e.target.value) <= MAX_BET) {
                  setState((prev) => ({
                    ...prev,
                    amount: Number(e.target.value),
                  }));
                }
              }}
              style={{
                width: "100%",
              }}
            />
          </div>
        </div>
        <CurrencyAmountDetails
          text="Min. amount:"
          currencyImg={Coin}
          amount={MIN_BET}
        />
      </div>
      <button
        className="wallet-button"
        onClick={() => {
          const result = validation();

          if (!result) {
            return;
          }
          paymentService
            .deposit({
              ...state,
            })
            .then((res) => {
              if (res) {
                setResult(res);
              }
            });
        }}
      >
        <span>Deposit</span>
      </button>
    </>
  );
};

export default Deposit;
