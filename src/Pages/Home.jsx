import React from "react";
import Header from "../Components/Header";
import Analitics from "../Components/Analitics";
import Transactions from "../Components/Transactions";
import IncomeResources from "../Components/IncomeResources";
import ExpenceResources from "../Components/ExpenceResources";

export default function Home() {
  const userDataString = localStorage.getItem("userData");
  const userData = userDataString ? JSON.parse(userDataString) : {};

  return (
    <div>
      <Header />
      <div className="flex justify-center py-4">
        <p className="max-w-primary w-full px-20 capitalize text-primarysize">
          <strong>Hi {userData.firstname} - </strong>
          <span className="text-black/[.60] font-medium">
            Here is whats happaning with your finanse
          </span>
        </p>
      </div>
      <div className="flex justify-center">
        <div className="max-w-primary w-full px-20 space-y-4">
          <Analitics />
          <div className="flex space-x-4">
            <div className="w-[59.5%]">
              <Transactions />
            </div>
            <div className="w-[39.2%] space-y-4">
              <IncomeResources/>
              <ExpenceResources/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
