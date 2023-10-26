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

  const ThisMonthExpenceDefarance = formatNumberWithOneDecimal(
    [
      (userDetails.thisMonthExpenses?.$numberDecimal -
        userDetails.lastMonthExpenses?.$numberDecimal) /
        userDetails.thisMonthExpenses?.$numberDecimal,
    ] * 100
  );

  const ThisWeekExpenceDefarance = formatNumberWithOneDecimal(
    [
      (userDetails.thisWeekExpenses?.$numberDecimal -
        userDetails.lastWeekExpenses?.$numberDecimal) /
        userDetails.thisWeekExpenses?.$numberDecimal,
    ] * 100
  );

  const TodayExpenceDefarance = formatNumberWithOneDecimal(
    [
      (userDetails.todayExpenses?.$numberDecimal -
        userDetails.yesterdayExpenses?.$numberDecimal) /
        userDetails.todayExpenses?.$numberDecimal,
    ] * 100
  );

  const ThisWeekIncomeDefarance = formatNumberWithOneDecimal(
    [
      (userDetails.thisWeekIncome?.$numberDecimal -
        userDetails.lastWeekIncome?.$numberDecimal) /
        userDetails.thisWeekIncome?.$numberDecimal,
    ] * 100
  );

  const ThisMonthIncomeDefarance = formatNumberWithOneDecimal(
    [
      (userDetails.thisMonthIncome?.$numberDecimal -
        userDetails.lastMonthIncome?.$numberDecimal) /
        userDetails.thisMonthIncome?.$numberDecimal,
    ] * 100
  );

  const expenses = [
    {
      id: 1,
      name: "today expenses",
      amount: formatNumber(userDetails.todayExpenses?.$numberDecimal),
      defarance: TodayExpenceDefarance,
      Url: "/",
    },
    {
      id: 2,
      name: "this week expenses",
      amount: formatNumber(userDetails.lastWeekExpenses?.$numberDecimal),
      defarance: ThisWeekExpenceDefarance,
      Url: "/transactions",
    },
    {
      id: 3,
      name: "this month expenses",
      amount: formatNumber(userDetails.thisMonthExpenses?.$numberDecimal),
      defarance: ThisMonthExpenceDefarance,
      Url: "/categories",
    },
  ];

  const income = [
    {
      id: 1,
      name: "this week income",
      amount: formatNumber(userDetails.thisWeekIncome?.$numberDecimal),
      defarance: ThisWeekIncomeDefarance,
      Url: "/settings",
    },
    {
      id: 2,
      name: "this month income",
      amount: formatNumber(userDetails.thisMonthIncome?.$numberDecimal),
      defarance: ThisMonthIncomeDefarance,
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
                  <div className={`w-1/5 flex justify-end items-center`}>
                    <p
                      className={item.defarance < 0 ? "text-green" : "text-red"}
                    >
                      {Math.abs(item.defarance)}%
                    </p>
                  </div>
                  <BsArrowUpShort
                    className={
                      item.defarance < 0
                        ? "text-title text-green rotate-180"
                        : "text-title text-red"
                    }
                  />
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
                  {userData.currency} {item.amount}
                </p>
                <div className={`w-1/5 flex justify-end items-center`}>
                  <p className={item.defarance < 0 ? "text-red" : "text-green"}>
                    {Math.abs(item.defarance)}%
                  </p>
                </div>
                <BsArrowUpShort
                  className={
                    item.defarance < 0
                      ? "text-title text-red rotate-180"
                      : "text-title text-green"
                  }
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
