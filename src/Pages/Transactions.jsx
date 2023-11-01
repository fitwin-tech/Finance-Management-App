import React from "react";
import Header from "../Components/Header";
import Banner from "../Assets/banner.jpg";
import Analitics from "../Components/Analitics";
import TransactionsMain from "../Components/TransactionsMain";
import IncomeResources from "../Components/IncomeResources";
import ExpenceResources from "../Components/ExpenceResources";
import AddCategories from "../Components/AddCategories";

export default function Transactions() {
  return (
    <div>
      <Header />
      <div className="space-y-4">
        <div
          className="bg-cover bg-center h-72 flex items-center justify-center" // You can adjust the height and other classes as needed
          style={{ backgroundImage: `url(${Banner})` }}
        >
          <div className="max-w-primary w-full px-20">
            <h1 className="text-white text-4xl font-bold p-4 ">Transactions</h1>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="max-w-primary w-full px-20 space-y-4">
            <Analitics />
            <div className="flex space-x-4">
              <div className="w-[59.5%]">
                <TransactionsMain />
              </div>
              <div className="w-[39.2%] space-y-4">
                <AddCategories />
                <IncomeResources />
                <ExpenceResources />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
