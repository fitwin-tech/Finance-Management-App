import React from "react";
import Header from "../Components/Header";
import Banner from "../Assets/banner.jpg";

export default function Categories() {
  return (
    <div>
      <Header />
      <div
        className="bg-cover bg-center h-72 flex items-center justify-center" // You can adjust the height and other classes as needed
        style={{ backgroundImage: `url(${Banner})` }}
      >
        <div className="max-w-primary w-full px-20">
          <h1 className="text-white text-4xl font-bold capitalize">
            Categories
          </h1>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="max-w-primary w-full px-20">
          <div className="w-full flex justify-end mt-4">
            <button className="bg-primary px-4 py-2 rounded-md text-white hover:bg-button_hover text-subtitle capitalize">
              Add new
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
