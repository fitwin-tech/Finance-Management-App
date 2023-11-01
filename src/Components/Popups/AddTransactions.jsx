import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { useAnalitics } from "../../Context/AnaliticsContext";
import api from "../../Api";
import axios from "axios";

export default function AddTransactions({ onClose }) {
  const { userData , categoryList } = useAnalitics();
  const [isOpen, setIsOpen] = useState(false);
  const [categoryTitle, setCategoryTitle] = useState("Select your category");
  const [categoryId, setCategoryId] = useState("Select your category");
  const [isIncome, setIsIncome] = useState(false);
  const [isExpence, setIsExpence] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [successMessege, setSuccessMessege] = useState("");

  const handleCategoryClick = (title, _id) => {
    setCategoryTitle(title);
    setCategoryId(_id);
    setIsOpen(false); // Close the dropdown
  };

  const handleIncomeChange = () => {
    setIsIncome(!isIncome);
    if (isExpence) {
      setIsExpence(false); // Uncheck "expense" when "income" is checked
    }
  };

  const handleExpenceChange = () => {
    setIsExpence(!isExpence);
    if (isIncome) {
      setIsIncome(false); // Uncheck "income" when "expense" is checked
    }
  };

  const handleTransaction = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    console.log("handleLogin function called");
    try {
      const response = await axios.post(
        api.transaction,
        {
          userId: userData.id,
          title,
          date,
          categoryId,
          category: categoryTitle,
          amount,
          is_income: isIncome,
        },
        {
          headers: {
            api_key: api.key,
            authantication: api.authantication,
          },
        }
      );

      console.log("Transaction response:", response);
    } catch (error) {
      console.error("adding failed:", error);
    } finally {
      setIsLoading(false);
      setSuccessMessege("Transaction Successfuly added")
    }
  };

  return (
    <div className="w-[700px] bg-white border rounded-lg p-4 py-6 space-y-4">
      <div className="capitalize text-subtitle flex space-x-4">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isIncome}
            onChange={handleIncomeChange}
          />
          <p>income</p>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isExpence}
            onChange={handleExpenceChange}
          />
          <p>expence</p>
        </div>
      </div>
      <p className="text-green">{successMessege}</p>
      <div className="flex items-center w-full space-x-4 text-subtitle">
        <div className="w-full space-y-2">
          <p className="font-semibold">Title</p>
          <input
            type="text"
            placeholder="Enter the title"
            className="border outline-none p-2 px-4 w-full rounded-md"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>
        <div className="w-full space-y-2">
          <p className="font-semibold">Date</p>
          <input
            type="date"
            className="border outline-none p-2 px-4 w-full rounded-md"
            onChange={(e) => setDate(e.target.value)}
            value={date}
          />
        </div>
      </div>
      <div className="flex items-center w-full space-x-4 text-subtitle">
        <div className="w-full space-y-2">
          <p className="font-semibold">Amount</p>
          <input
            type="text"
            placeholder="Enter the amount"
            className="border outline-none p-2 px-4 w-full rounded-md"
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
          />
        </div>
        <div className="w-full space-y-2">
          <p className="font-semibold">Category</p>
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="border outline-none p-2 px-4 w-full rounded-md flex cursor-pointer"
          >
            <p className="w-full">{categoryTitle}</p>
            <div className="relative">
              <IoMdArrowDropdown
                className={`text-[1.3rem] hover:cursor-pointer inline ml-1 transform ${
                  isOpen ? "rotate-180" : "rotate-0"
                } transition-transform duration-300 ease-in-out`}
              />
              {isOpen && (
                <ul className="absolute top-10 w-[12rem] right-0 rounded shadow bg-input_bg z-10 bg-white">
                  {categoryList.map((index) => (
                    <li
                      key={index.id}
                      className="capitalize cursor-pointer hover:bg-white_hover px-4 py-2"
                      onClick={() =>
                        handleCategoryClick(index.title, index._id)
                      }
                    >
                      {index.title}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="space-x-2 flex justify-end">
        <div className="border rounded-md border-primary hover:bg-button_hover text-subtitle capitalize">
          <button
            onClick={onClose}
            className="text-primary px-4 py-2 rounded-md hover:text-white"
          >
            Cancel
          </button>
        </div>

        <button onClick={handleTransaction} className="bg-primary px-4 py-2 rounded-md text-white hover:bg-button_hover text-subtitle capitalize">
          {isLoading ? "Loading..." : "Add New"}
        </button>
      </div>
    </div>
  );
}
