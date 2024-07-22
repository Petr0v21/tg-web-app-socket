"use client";
import React from "react";
import "./index.css";

const Pagination: React.FC<{
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
}> = ({ currentPage, setCurrentPage, totalPages }) => {
  return (
    <div className="transaction-pagination">
      <div
        className={`nav-button ${
          currentPage - 1 !== 0 && "nav-button-active"
        } left-side`}
        onClick={() =>
          currentPage - 1 !== 0 && setCurrentPage((prev) => prev - 1)
        }
      />
      {totalPages - (currentPage - 1) > 5 ? (
        <>
          <span
            className="transaction-pagination-index-page current-index-page"
            onClick={() => setCurrentPage(currentPage)}
          >
            {currentPage}
          </span>
          <span
            className="transaction-pagination-index-page"
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            {currentPage + 1}
          </span>
          <span
            className="transaction-pagination-index-page"
            onClick={() => setCurrentPage(currentPage + 2)}
          >
            {currentPage + 2}
          </span>
          <span>...</span>
          <span
            className="transaction-pagination-index-page"
            onClick={() => setCurrentPage(totalPages)}
          >
            {totalPages}
          </span>
        </>
      ) : (
        <>
          {Array.from({
            length: totalPages > 5 ? 5 : totalPages,
          }).map((_, idx, arr) => (
            <span
              className={`transaction-pagination-index-page ${
                currentPage === totalPages - arr.length + 1 + idx &&
                "current-index-page"
              }`}
              onClick={() => setCurrentPage(totalPages - arr.length + 1 + idx)}
              key={totalPages - arr.length + 1 + idx + "page"}
            >
              {totalPages - arr.length + 1 + idx}
            </span>
          ))}
        </>
      )}
      <div
        className={`nav-button ${
          totalPages !== currentPage && "nav-button-active"
        } right-side`}
        onClick={() =>
          totalPages !== currentPage && setCurrentPage((prev) => prev + 1)
        }
      />
    </div>
  );
};

export default Pagination;
