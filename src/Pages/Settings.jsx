import React from "react";
import Header from "../Components/Header";
import Banner from "../Assets/banner.jpg";

export default function Settings() {
  return (
    <div>
      <Header />
      <div
        className="bg-cover bg-center h-72 flex items-center justify-center" // You can adjust the height and other classes as needed
        style={{ backgroundImage: `url(${Banner})` }}
      >
        <div className="max-w-primary w-full">
          <h1 className="text-white text-4xl font-bold p-4 ">Settings</h1>
        </div>
      </div>
    </div>
  )
}
