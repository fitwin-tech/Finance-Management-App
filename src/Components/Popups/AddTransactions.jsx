import React from "react";

export default function AddTransactions({ onClose }) {
  return (
    <div className="w-[700px] bg-white border rounded-lg p-4 py-6 space-y-4">
      <div className="capitalize text-subtitle flex space-x-4">
        <div className="flex items-center space-x-2">
          <input type="checkbox" />
          <p>income</p>
        </div>
        <div className="flex items-center space-x-2">
          <input type="checkbox" />
          <p>Expence</p>
        </div>
      </div>
      <div className="flex items-center w-full space-x-4 text-subtitle">
        <div className="w-full space-y-2">
          <p className="font-semibold">Title</p>
          <input
            type="text"
            placeholder="Enter the title"
            className="border outline-none p-2 px-4 w-full rounded-md"
          />
        </div>
        <div className="w-full space-y-2">
          <p className="font-semibold">Date</p>
          <input
            type="date"
            className="border outline-none p-2 px-4 w-full rounded-md"
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
          />
        </div>
        <div className="w-full space-y-2">
          <p className="font-semibold">Category</p>
          <input
            type="text"
            placeholder="Enter the category"
            className="border outline-none p-2 px-4 w-full rounded-md"
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

        <button className="bg-primary px-4 py-2 rounded-md text-white hover:bg-button_hover text-subtitle capitalize">
          Add new
        </button>
      </div>
    </div>
  );
}
