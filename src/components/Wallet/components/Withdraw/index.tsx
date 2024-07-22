"use client";
import React, { useState } from "react";
import "./index.css";
import SelectComponent, { SelectItemType } from "../Select";
import Eth from "../../../../../public/Eth.svg";
import Usdt from "../../../../../public/USDT.svg";
import Ton from "../../../../../public/TON.png";
import Coin from "../../../../../public/coin/CoinFront.svg";
import Image from "next/image";
import { useUser } from "@/context/user.provider";
import { BetButtonPercent } from "@/components/Bet";
import { CurrencyAmountDetails } from "../..";
import { paymentService } from "@/services/paymentService";

const mockWithdrawData: {
  currency: SelectItemType[];
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
};

const MAX_BET = 1000000;
const MIN_BET = 0.16;

const Withdraw: React.FC = () => {
  const [state, setState] = useState<{
    currency: string;
    address: string;
    amount: number;
  }>({
    currency: "ETH",
    address: "",
    amount: MIN_BET,
  });
  const [errors, setErrors] = useState<{
    address?: string;
    amount?: string;
  }>({});
  const user = useUser();

  const percentButtonHandler = (balance: number, percent: number) => {
    return () => {
      if (errors.amount) {
        setErrors((prev) => ({ ...prev, amount: undefined }));
      }
      setState((prev) => ({
        ...prev,
        amount: balance / percent,
      }));
    };
  };

  const validation = () => {
    if (!user) {
      return;
    }
    if (!state.address) {
      setErrors((prev) => ({ ...prev, address: "Address required field" }));
      return false;
    }
    if (!state.amount || state.amount < MIN_BET) {
      setErrors((prev) => ({
        ...prev,
        amount: "Amount required and must be more than MIN_BET",
      }));
      return false;
    }

    if (state.amount > user.balance) {
      setErrors((prev) => ({
        ...prev,
        amount: "Amount required and must be more than MIN_BET",
      }));
      return false;
    }
    return true;
  };

  return (
    <>
      <div className="wallet-choose-container">
        <p className="wallet-subtitle">Choose currency</p>
        <SelectComponent
          choosed={
            mockWithdrawData.currency.find(
              ({ value }) => value === state.currency
            )!
          }
          list={mockWithdrawData.currency.filter(
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
      <div className="wallet-type-details-container">
        <p className="wallet-subtitle">withdraw via blockchain</p>
        <span className="wallet-type-details">
          Direct withdrawals via the blockchain can take up to 10 minutes.
          Please be patient!
        </span>
      </div>
      <div className="wallet-choose-container">
        <div
          className={`wallet-input-address ${
            errors.address && "input-invalid"
          }`}
        >
          <input
            value={state.address}
            onChange={(e) => {
              if (errors.address) {
                setErrors((prev) => ({ ...prev, address: undefined }));
              }
              setState((prev) => ({ ...prev, address: e.target.value }));
            }}
            placeholder="Put your address"
          />
          <p className="wallet-input-address-error error-text">
            {errors.address}
          </p>
        </div>
      </div>
      <div className="wallet-input-amount-container">
        <div className="wallet-withdraw-header">
          <p className="wallet-subtitle">Withdraw Amount</p>
          <CurrencyAmountDetails
            text="Available:"
            currencyImg={Coin}
            amount={user?.balance ?? 0}
          />
        </div>
        <div className={`custom-input ${errors.amount && "input-invalid"}`}>
          <div className="custom-input-part">
            <Image src={Coin} alt="Eth" width={24} height={24} />
            <input
              className="custom-input-field"
              value={state.amount.toString()}
              type="number"
              min={0}
              max={MAX_BET}
              onChange={(e) => {
                if (errors.amount) {
                  setErrors((prev) => ({ ...prev, amount: undefined }));
                }
                if (Number(e.target.value) <= MAX_BET) {
                  setState((prev) => ({
                    ...prev,
                    amount: Number(e.target.value),
                  }));
                }
              }}
            />
          </div>
          <div className="custom-input-part">
            <BetButtonPercent
              handler={percentButtonHandler(user?.balance ?? 0, 4)}
              amountPercent={4}
            />
            <BetButtonPercent
              handler={percentButtonHandler(user?.balance ?? 0, 2)}
              amountPercent={2}
            />
            <BetButtonPercent
              handler={percentButtonHandler(user?.balance ?? 0, 1)}
              amountPercent={1}
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
            .withdraw({
              ...state,
            })
            .then((res) => {
              if (res) {
                //TODO handler
              }
            });
        }}
      >
        <span>Withdraw</span>
      </button>
    </>
  );
};

export default Withdraw;
