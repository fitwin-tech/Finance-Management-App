import React, { useState } from "react";
import { useAnalitics } from "../../Context/AnaliticsContext";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import api from "../../Api";
import axios from "axios";

export default function AddTransactions({ onClose, setTransactions }) {
  const { userData, categoryList } = useAnalitics();
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
      setTransactions((transactions) => [...transactions, response.data]);
    } catch (error) {
      console.error("adding failed:", error);
    } finally {
      setIsLoading(false);
      setSuccessMessege("Transaction Successfuly added");
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
          <Autocomplete
            className="border-none"
            id="clear-on-escape"
            clearOnEscape
            sx={{
              color: "success.main",
              "& .MuiAutocomplete-inputRoot": {
                border: "none", // Remove the border
              },
              "& .MuiInputLabel-root": {
                fontSize: "14px", // Set label font size to 14px
              },
              "& .MuiAutocomplete-input": {
                fontSize: "14px", // Set text size to 14px
                border: "1px solid white", // Set the default border color to white
                height: "5px", // Set input height to 5px
                "&:hover": {
                  border: "1px solid white", // Change border to black on hover
                },
                "& .Mui-focused": {
                  border: "1px solid white", // Change border to blue when focused
                },
              },
            }}
            options={categoryList.map((category) => ({
              label: category.title,
              value: category._id,
            }))}
            renderInput={(params) => (
              <TextField {...params} placeholder="Enter your category" />
            )}
            onChange={(event, newValue) => {
              if (newValue) {
                handleCategoryClick(newValue.label, newValue.value);
              }
            }}
          />
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

        <button
          onClick={handleTransaction}
          className="bg-primary px-4 py-2 rounded-md text-white hover:bg-button_hover text-subtitle capitalize"
        >
          {isLoading ? "Loading..." : "Add New"}
        </button>
      </div>
    </div>
  );
}
