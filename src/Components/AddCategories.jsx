import React, { useState } from "react";
import { useAnalitics } from "../Context/AnaliticsContext";
import api from "../Api";
import axios from "axios";

export default function AddCategories() {
  const [isIncome, setIsIncome] = useState(false);
  const [isExpence, setIsExpence] = useState(false);
  const { userData, categoryList, updateCategoryList } = useAnalitics();
  const [isLoading, setIsLoading] = useState(false);
  const [successMessege, setSuccessMessege] = useState("");
  const [title, setTitle] = useState();

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

  const handleAddCategories = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    console.log("function called");
    try {
      const response = await axios.post(
        api.category,
        {
          userId: userData.id,
          title,
          is_income: isIncome,
        },
        {
          headers: {
            api_key: api.key,
            authantication: api.authantication,
          },
        }
      );

      // After adding a category, update the category list
      updateCategoryList([...categoryList, response.data]); // Assuming response.data contains the new category

      console.log("Category response:", response);
    } catch (error) {
      console.error("Category failed:", error);
    } finally {
      setIsLoading(false);
      setSuccessMessege("Category Successfuly added");
    }
  };

  return (
    <div className="border rounded-md p-4 space-y-4">
      <div>
        <h1 className="font-bold capitalize">Categories</h1>
      </div>

      <p className="text-green">{successMessege}</p>

      <div className="w-full capitalize grid grid-cols-4 gap-4">
        {categoryList.map((index) => (
          <div
            className={`p-2 px-4 rounded-sm text-center text-subtitle ${
              index.is_income
                ? "text-green bg-green/[.15]"
                : "text-red bg-red/[.15]"
            }`}
          >
            <p>{index.title}</p>
          </div>
        ))}
      </div>

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

      <div className="max-w-[500px] w-full">
        <input
          placeholder="Enter category name"
          className="border p-2 rounded-md w-full outline-none"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleAddCategories}
          className="bg-primary px-4 py-2 rounded-md text-white hover:bg-button_hover text-subtitle capitalize"
        >
          {isLoading ? "Loading..." : "Add New"}
        </button>
      </div>
    </div>
  );
}
