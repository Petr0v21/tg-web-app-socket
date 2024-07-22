"use client";
import React, { useState } from "react";
import "./index.css";
import Image, { StaticImageData } from "next/image";

export type SelectItemType = {
  image?: string | StaticImageData;
  value: string;
};

export type SelectProps = {
  choosed: SelectItemType;
  list: SelectItemType[];
  chooseHandler: (value: string) => void;
};

const SelectComponent: React.FC<SelectProps> = ({
  choosed,
  list,
  chooseHandler,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="select">
      <div
        className={`select-container ${
          isOpen ? "select-container-with-open-dropdown" : ""
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="select-item">
          <div className="select-input">
            {choosed.image && (
              <Image alt="val-img" src={choosed.image} width={24} height={24} />
            )}
            <span className="select-input-value">{choosed.value}</span>
          </div>
          <div className={`select-icon ${isOpen && "select-icon-active"}`} />
        </div>
      </div>
      <div
        className={`select-dropdown ${
          isOpen ? "dropdown-open" : "dropdown-hide"
        }`}
      >
        {list.map(({ value, image }, idx) => (
          <div
            className="select-item"
            onClick={() => {
              chooseHandler(value);
              setIsOpen(false);
            }}
            key={"select-item-" + idx}
          >
            <div className="select-input">
              {image && (
                <Image alt="val-img" src={image} width={24} height={24} />
              )}
              <span className="select-input-value">{value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectComponent;
