import React from "react";
import { BsArrowUpShort } from "react-icons/bs";
import { useAnalitics } from "../Context/AnaliticsContext";

export default function Analitics() {
  const { userDetails, loading, userData, formatNumber } = useAnalitics();

  // Define a number formatting function
  const formatNumberWithOneDecimal = (number) => {
    if (typeof number !== "number") {
      return "N/A";
    }
    return number.toFixed(1);
  };

  const expenses = [
    {
      id: 1,
      name: "today expenses",
      amount: formatNumber(userDetails.todayExpenses?.$numberDecimal),
      defarance: "64%",
      Url: "/",
    },
    {
      id: 2,
      name: "this week expenses",
      amount: formatNumber(userDetails.lastWeekExpenses?.$numberDecimal),
      defarance: "34%",
      Url: "/transactions",
    },
    {
      id: 3,
      name: "this month expenses",
      amount: formatNumber(userDetails.thisMonthExpenses?.$numberDecimal),
      defarance: formatNumberWithOneDecimal(
        [
          (userDetails.lastMonthExpenses?.$numberDecimal -
            userDetails.thisMonthExpenses?.$numberDecimal) /
            userDetails.lastMonthExpenses?.$numberDecimal,
        ] * 100
      ),
      Url: "/categories",
    },
  ];

  const income = [
    {
      id: 1,
      name: "this week income",
      amount: formatNumber(userDetails.thisWeekIncome?.$numberDecimal),
      defarance: "4%",
      Url: "/settings",
    },
    {
      id: 2,
      name: "this month income",
      amount: formatNumber(userDetails.thisMonthIncome?.$numberDecimal),
      defarance:
        (userDetails.thisMonthIncome?.$numberDecimal /
          userDetails.lastMonthIncome?.$numberDecimal) *
        100,
      Url: "/settings",
    },
  ];

  return (
    <div>
      {loading ? (
        "loading"
      ) : (
        <div className="grid grid-cols-5 gap-4">
          {expenses.map((item) => {
            return (
              <div
                key={item.id}
                className="border p-4 rounded-md w-full space-y-2"
              >
                <p className="uppercase text-subtitle font-semibold text-black/[.60]">
                  {item.name}
                </p>
                <div className="flex w-full items-center">
                  <p className="w-4/5 font-semibold text-title2">
                    {" "}
                    {userData.currency} {item.amount}
                  </p>
                  <div className="w-1/5 flex justify-end items-center">
                    <p className="text-red">{item.defarance}</p>
                  </div>
                  <BsArrowUpShort className="text-title text-red" />
                </div>
              </div>
            );
          })}

          {income.map((item) => (
            <div
              key={item.id}
              className="border p-4 rounded-md w-full space-y-2"
            >
              <p className="uppercase text-subtitle font-semibold text-black/[.60]">
                {item.name}
              </p>
              <div className="flex w-full items-center">
                <p className="w-4/5 font-semibold text-title2">
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
