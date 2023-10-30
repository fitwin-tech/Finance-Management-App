import React, { useState } from "react";
import Transaction from "../Json/Transactions.json";
import { useAnalitics } from "../Context/AnaliticsContext";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { IoIosArrowUp } from "react-icons/io";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import api from "../Api";

export default function Transactions() {
  const { userData, formatNumber } = useAnalitics();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Helper function to format the date
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  // Create a dropdown JSON for date ranges
  const dropdown = [
    {
      id: 1,
      name: "Today",
      filterFunction: (item) => {
        const today = new Date().toLocaleDateString();
        return item.date === today;
      },
    },
    {
      id: 2,
      name: "Yesterday",
      filterFunction: (item) => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        return item.date === yesterday.toLocaleDateString();
      },
    },
    {
      id: 3,
      name: "This Week",
      filterFunction: (item) => {
        const today = new Date();
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay());
        return new Date(item.date) >= startOfWeek;
      },
    },
    {
      id: 4,
      name: "Last Week",
      filterFunction: (item) => {
        const today = new Date();
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay() - 7);
        const endOfWeek = new Date(today);
        endOfWeek.setDate(today.getDate() - today.getDay() - 1);
        return (
          new Date(item.date) >= startOfWeek && new Date(item.date) <= endOfWeek
        );
      },
    },
  ];

  const [filteredTransactions, setFilteredTransactions] = useState(Transaction);

  const handleDropdownClick = (filterFunction) => {
    setIsOpen(false);
    setFilteredTransactions(Transaction.filter(filterFunction));
  };

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
          <div className="w-[150px] flex justify-end items-cinter">
            <div className="relative flex items-center">
              <p
                className="text-subtitle capitalize cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
              >
                last 7 days
              </p>
              <MdOutlineKeyboardArrowDown
                className={`text-[1.3rem] hover:cursor-pointer inline ml-1 transform ${
                  isOpen ? "rotate-180" : "rotate-0"
                } transition-transform duration-300 ease-in-out`}
                onClick={() => setIsOpen(!isOpen)}
              />
              {isOpen && (
                <ul className="absolute top-8 w-[8rem] right-0 rounded shadow bg-input_bg z-10 bg-white">
                  {dropdown.map((item) => (
                    <li
                      key={item.id}
                      className="capitalize cursor-pointer hover:bg-white_hover px-4 py-2 text-subtitle"
                      onClick={() => handleDropdownClick(item.filterFunction)}
                    >
                      {item.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
        <div className="space-y-4">
          {filteredTransactions.map((index) => (
            <div
              className="grid grid-cols-4 gap-4 text-subtitle text-black/[.70]"
              key={index.id}
            >
              <div>
                <p className="font-semibold text-black capitalize">
                  {index.title}
                </p>
                <p>{formatDate(index.date)}</p>
              </div>
              <div className="flex space-x-1 items-center">
                <p>{userData.currency}</p>
                <p>{formatNumber(index.amount)}</p>
              </div>
              <div className="flex justify-end items-center capitalize">
                <p>{index.category}</p>
              </div>
              <div className="flex justify-end capitalize items-center">
                {index.is_income ? (
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
          ))}
        </div>
        <div className="flex items-center space-x-1 justify-end text-primary">
          <p
            className="cursor-pointer"
            onClick={() => navigate("/transactions")}
          >
            See All Transactions
          </p>
          <IoIosArrowUp
            onClick={() => navigate("/transactions")}
            className="rotate-90 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
