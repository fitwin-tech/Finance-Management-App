import React from "react";
import Header from "../Components/Header";
import Banner from "../Assets/banner.jpg";
import TransactionsMain from "../Components/TransactionsMain";
import AddCategories from "../Components/AddCategories";
import { AnaliticsProvider } from "../Context/AnaliticsContext";

export default function Transactions() {
  return (
    <AnaliticsProvider>
      <div>
        <Header />
        <div className="space-y-4">
          <div
            className="bg-cover bg-center h-72 flex items-center justify-center" // You can adjust the height and other classes as needed
            style={{ backgroundImage: `url(${Banner})` }}
          >
            <div className="max-w-primary w-full px-4">
              <h1 className="text-white text-4xl font-bold p-4 ">
                Transactions
              </h1>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="max-w-primary w-full px-4 space-y-4">
              <div className="w-full sm:block md:hidden lg:hidden">
                <AddCategories />
              </div>
              <div className="flex space-x-4">
                <div className="w-full">
                  <TransactionsMain />
                </div>
                <div className="w-[60%] space-y-4 sm:hidden md:block lg:block">
                  <AddCategories />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnaliticsProvider>
  );
}
