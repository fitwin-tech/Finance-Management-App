import React, { useState, useEffect, useRef } from "react";
import { useAnalitics } from "../Context/AnaliticsContext";
import AddTransactions from "../Components/Popups/AddTransactions";
import { FaRegCalendarAlt } from "react-icons/fa";
import api from "../Api";
import axios from "axios";
import DateRangePopup from "./Popups/DateRangePick";

export default function TransactionsMain() {
  const { userData, formatNumber } = useAnalitics();
  const [popupVisible, setPopupVisible] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [datePopupVisible, setDatePopupVisible] = useState(false);
  const popupRef = useRef();

  const openPopup = () => {
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  const openDatePopup = () => {
    setDatePopupVisible(true);
  };

  const closeDatePopup = () => {
    setDatePopupVisible(false);
  };

  const handleDateSelect = (startDate, endDate) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      closePopup();
    }
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      closeDatePopup();
    }
  };

  // Listen for clicks outside of the popups
  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    axios
      .get(`${api.getTransactions}/${userData.id}`, {
        headers: {
          api_key: api.key,
          authantication: api.authantication,
        },
      })
      .then((response) => {
        const sortedTransactions = response.data.transactions
          .filter((transaction) => {
            if (startDate && endDate) {
              const transactionDate = new Date(transaction.date);
              return transactionDate >= startDate && transactionDate <= endDate;
            }
            return true; // No date range selected, include all transactions
          })
          .sort((a, b) => new Date(b.date) - new Date(a.date));

        setTransactions(sortedTransactions);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        //setLoading(true);
      });
  }, [userData.id, startDate, endDate]);

  // Helper function to format the date
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  return (
    <div>
      <div className="border w-full p-4 rounded-lg space-y-6">
        <div className="flex items-center">
          <div className="w-full">
            <p className="font-bold">Transactions</p>
            <p className="text-subtitle text-black/[.70]">
              View your all expenses and income you have done recently
            </p>
          </div>
          <div className="w-[150px] flex justify-end">
            <button
              onClick={openPopup}
              className="bg-primary px-4 py-2 rounded-md text-white hover:bg-button_hover text-subtitle capitalize"
            >
              Add new
            </button>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="bg-white w-fit rounded-default">
            <div onClick={openDatePopup} className="flex items-center space-x-2 border p-2 rounded-md w-fit">
              <FaRegCalendarAlt className="text-subtitle text-black/[.60]" />
              <div className="flex items-center space-x-2 text-subtitle">
                <p>{startDate ? startDate.toDateString() : "Start date"}</p>
                <p>-</p>
                <p>{endDate ? endDate.toDateString() : "End date"}</p>
              </div>
            </div>

            <div className="absolute top-[33rem]" ref={popupRef}>
              {datePopupVisible ? (
                <DateRangePopup
                  onDateSelect={handleDateSelect}
                  initialStartDate={startDate}
                  initialEndDate={endDate}
                />
              ) : null}
            </div>
          </div>
        </div>
        {transactions.length === 0 ? (
          <div>
            <div className="flex justify-center">
              <img
                className="w-[30rem]"
                alt="nodata"
                src="https://firebasestorage.googleapis.com/v0/b/portfolios-62a43.appspot.com/o/8376575_3826710.svg?alt=media&token=34ff203d-402b-4cfd-9ceb-472a1e8f9f34&_gl=1*hfkjqd*_ga*NTE3MjM3NDA3LjE2OTU5NjI9NDc.*_ga_CW55HF8NVT*MTY5OTE4MTk1Ny42LjEuMTY5OTE4Mjk2Ni4yMi4wLjA."
              ></img>
            </div>
          </div>
        ) : (
          <div className="space-y-4 overflow-y-auto h-[400px] scrollbar-hidden">
            {transactions.map((transaction) => (
              <div key={transaction.id}>
                <div
                  className="grid-cols-4 gap-4 text-subtitle text-black/[.70] sm:hidden md:hidden lg:grid"
                >
                  <div>
                    <p className="font-semibold text-black capitalize">
                      {transaction.title}
                    </p>
                    <p>{formatDate(transaction.date)}</p>
                  </div>
                  <div className="flex space-x-1 items-center">
                    <p>{userData.currency}</p>
                    <p>{formatNumber(transaction.amount.$numberDecimal)}</p>
                  </div>
                  <div className="flex justify-end items-center capitalize">
                    <p>{transaction.category}</p>
                  </div>
                  <div className="flex justify-end capitalize items-center space-x-4">
                    {transaction.is_income ? (
                      <p className="text-green bg-green/[.15] px-5 py-1 rounded-sm font-semibold">
                        income
                      </p>
                    ) : (
                      <p className="text-red bg-red/[.15] px-4 py-1 rounded-sm font-semibold">
                        expense
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {popupVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/[60%] w-full">
          <AddTransactions
            onClose={closePopup}
            setTransactions={setTransactions}
          />
        </div>
      )}
    </div>
  );
}
