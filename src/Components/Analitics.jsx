import React, { useState, useEffect } from "react";
import axios from "axios";
import api from "../Api";
import { BsArrowUpShort } from "react-icons/bs";

export default function Analitics() {
  const userDataString = localStorage.getItem("userData");
  const userData = userDataString ? JSON.parse(userDataString) : {};
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${api.userdetails}/${userData.email}`, {
        headers: {
          api_key: api.key,
          authantication: api.authantication,
        },
      })
      .then((response) => {
        setUserDetails(response.data.results);
        setLoading(false);
        console.log(response);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(true);
      });
  }, [userData.email]);

  const formatNumber = (number) => {
    if (number !== undefined) {
      // Ensure the number is a valid float and then format it
      const formattedNumber = parseFloat(number).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      return formattedNumber;
    }
    return "";
  };

  const expenses = [
    {
      id: 1,
      name: "today expenses",
      amount: formatNumber(userDetails.todayExpenses?.$numberDecimal),
      Url: "/",
    },
    {
      id: 2,
      name: "this week expenses",
      amount: formatNumber(userDetails.lastWeekExpenses?.$numberDecimal),
      Url: "/transactions",
    },
    {
      id: 3,
      name: "this month expenses",
      amount: formatNumber(userDetails.thisMonthExpenses?.$numberDecimal),
      Url: "/categories",
    },
  ];

  const income = [
    {
      id: 1,
      name: "this week income",
      amount: formatNumber(userDetails.thisWeekIncome?.$numberDecimal),
      Url: "/settings",
    },
    {
      id: 2,
      name: "this month income",
      amount: formatNumber(userDetails.thisMonthIncome?.$numberDecimal),
      Url: "/settings",
    },
  ];
  return (
    <div>
      {loading ? (
        "loading"
      ) : (
        <div className="grid grid-cols-5 gap-4">
          {expenses.map((item) => (
            <div
              key={item.id}
              className="border p-4 rounded-md w-full space-y-2"
            >
              <p className="uppercase text-subtitle font-semibold text-black/[.60]">
                {item.name}
              </p>
              <div className="flex w-full items-center">
                <p className="w-4/5 font-bold text-title2">
                  {" "}
                  {userData.currency} {item.amount}
                </p>
                <div className="w-1/5 flex justify-end items-center">
                  <p>36%</p>
                </div>
                <BsArrowUpShort className="text-title" />
              </div>
            </div>
          ))}

          {income.map((item) => (
            <div
              key={item.id}
              className="border p-4 rounded-md w-full space-y-2"
            >
              <p className="uppercase text-subtitle font-semibold text-black/[.60]">
                {item.name}
              </p>
              <div className="flex w-full items-center">
                <p className="w-4/5 font-bold text-title2">
                  {" "}
                  {userData.currency} {item.amount}
                </p>
                <div className="w-1/5 flex justify-end items-center">
                  <p>36%</p>
                </div>
                <BsArrowUpShort className="text-title" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
