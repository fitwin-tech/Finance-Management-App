import React, { useState, useEffect } from "react";
import { useAnalitics } from "../Context/AnaliticsContext";
import AddTransactions from "../Components/Popups/AddTransactions";
import { useNavigate } from "react-router-dom";
import { BsDot } from "react-icons/bs";
import api from "../Api";
import axios from "axios";

export default function TransactionsMain() {
  const { userData, formatNumber } = useAnalitics();
  const [popupVisible, setPopupVisible] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const openPopup = () => {
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  useEffect(() => {
    axios
      .get(`${api.getTransactions}/${userData.id}`, {
        headers: {
          api_key: api.key,
          authantication: api.authantication,
        },
      })
      .then((response) => {
        const fetchedTransactions = response.data.transactions;
        const filteredTransactions = fetchedTransactions
          .filter((transaction) => {
            const searchMatches =
              transaction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              transaction.category.toLowerCase().includes(searchTerm.toLowerCase());

            const dateMatches =
              (!startDate || !endDate) ||
              (new Date(transaction.date) >= new Date(startDate) &&
                new Date(transaction.date) <= new Date(endDate));

            return searchMatches && dateMatches;
          })
          .sort((a, b) => new Date(b.date) - new Date(a.date));

        setTransactions(filteredTransactions);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // setLoading(true);
      });
  }, [userData.id, startDate, endDate, searchTerm]);

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
              className="bg-primary px-4 py-2 rounded-md text-white hover:bg-button_hover text-subtitle capitalize sm:hidden md:block"
            >
              Add new
            </button>
            <button
              onClick={() => navigate("/addnew")}
              className="bg-primary px-4 py-2 rounded-md text-white hover:bg-button_hover text-subtitle capitalize sm:block md:hidden"
            >
              Add new
            </button>
          </div>
        </div>
        <div className="space-x-2 sm:hidden md:flex">
          <div className="border rounded-md w-full flex items-center p-2">
            <input
              className="w-full outline-none"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="border rounded-md w-full flex items-center p-2 flex items-center space-x-2">
            <input
              className="w-full outline-none"
              type="date"
              placeholder="Start Date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <input
              className="w-full outline-none"
              type="date"
              placeholder="End Date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
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
          <div className="space-y-4 overflow-y-auto max-h-[400px] h-full scrollbar-hidden">
            {transactions.map((transaction) => (
              <div key={transaction.id}>
                <div className="grid-cols-4 gap-4 text-subtitle text-black/[.70] sm:hidden md:hidden lg:grid">
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

                <div className="sm:block md:block lg:hidden">
                  <div className="flex items-center">
                    <p className="w-full capitalize text-subtitle font-semibold">
                      {transaction.title}
                    </p>
                    <div className="flex justify-end capitalize items-center">
                      {transaction.is_income ? (
                        <div className="flex items-center">
                          <BsDot className="text-[1.5rem] text-green" />
                          <p className="text-green rounded-sm font-semibold">
                            income
                          </p>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <BsDot className="text-[1.5rem] text-red" />
                          <p className="text-red rounded-sm font-semibold">
                            Expense
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center text-black/[.60]">
                    <p className="w-full capitalize text--subtitle">
                      {transaction.category}
                    </p>
                    <p className="w-[60%] flex justify-end text-subtitle">
                      {userData.currency}{" "}
                      {formatNumber(transaction.amount.$numberDecimal)}
                    </p>
                  </div>
                  <p className="text-subtitle text-black/[.60]">
                    {formatDate(transaction.date)}
                  </p>
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
