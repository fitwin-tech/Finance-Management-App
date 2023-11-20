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
  const [errorMessege, setErrorMessege] = useState("");
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
      const data = response.data;
      if (data) {
        setSuccessMessege("Category Successfuly added");
        setErrorMessege("");
      } else {
        console.error("Login failed with access token");
        setErrorMessege("Something Went Wrong");
        setSuccessMessege("");
      }
    } catch (error) {
      console.error("Category failed:", error);
      setErrorMessege("Something Went Wrong");
      setSuccessMessege("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border rounded-md p-4 space-y-4">
      <div>
        <h1 className="font-bold capitalize">Categories</h1>
      </div>

      <p className="text-green">{successMessege}</p>
      <p className="text-red">{errorMessege}</p>

      <div className="sm:hidden md:block lg:block">
        <div className="w-full capitalize md:grid-cols-2 lg:grid-cols-3 gap-4 grid overflow-y-auto h-full max-h-[200px] scrollbar-hidden">
          {categoryList.map((index) => (
            <div
              className={`p-2 px-4 rounded-sm text-center text-subtitle  ${
                index.is_income
                  ? "text-green bg-green/[.15]"
                  : "text-red bg-red/[.15]"
              }`}
            >
              <p className="w-full">{index.title}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="sm:block md:hidden lg:hidden">
        <div className="w-full capitalize grid-cols-3 gap-4 sm:hidden sm:hidden lg:grid">
          {categoryList.map((index) => (
            <div
              className={`p-2 px-4 rounded-sm text-center text-subtitle ${
                index.is_income
                  ? "text-green bg-green/[.15]"
                  : "text-red bg-red/[.15]"
              }`}
            >
              <p className="w-full">{index.title}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="capitalize text-subtitle flex space-x-4">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isIncome}
            onChange={handleIncomeChange}
          />
          <p className="cursor-pointer" onClick={handleIncomeChange}>
            income
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isExpence}
            onChange={handleExpenceChange}
          />
          <p className="cursor-pointer" onClick={handleExpenceChange}>
            expence
          </p>
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
