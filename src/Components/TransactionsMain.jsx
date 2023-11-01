import React, { useState, useEffect } from "react";
import { useAnalitics } from "../Context/AnaliticsContext";
import AddTransactions from "../Components/Popups/AddTransactions";
import { MdDeleteOutline } from "react-icons/md";
import api from "../Api"
import axios from "axios";

export default function TransactionsMain() {
  const { userData, formatNumber } = useAnalitics();
  const [popupVisible, setPopupVisible] = useState(false);
  const [transactions, setTransactions] = useState([]);

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
        const sortedTransactions = response.data.transactions.sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        });
  
        setTransactions(sortedTransactions);
        console.log(response);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        //setLoading(true);
      });
  }, [userData.id]);

  // Helper function to format the date
function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
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
        <div className="space-y-4">
          {transactions.map((index) => (
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
                <p>{formatNumber(index.amount.$numberDecimal)}</p>
              </div>
              <div className="flex justify-end items-center capitalize">
                <p>{index.category}</p>
              </div>
              <div className="flex justify-end capitalize items-center space-x-4">
                {index.is_income ? (
                  <p className="text-green bg-green/[.15] px-5 py-1 rounded-sm font-semibold">
                    income
                  </p>
                ) : (
                  <p className="text-red bg-red/[.15] px-4 py-1 rounded-sm font-semibold">
                    expense
                  </p>
                )}
                <div className="p-1 hover:text-red">
                  <MdDeleteOutline className="text-[1.2rem] text-black[.60]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {popupVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/[60%] w-full">
          <AddTransactions onClose={closePopup} setTransactions={setTransactions}/>
        </div>
      )}
    </div>
  );
}
