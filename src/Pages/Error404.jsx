import React from "react";
import Error from "../Assets/Error404.svg";
import { useNavigate } from "react-router-dom";

export default function Error404() {
  const navigate = useNavigate();
  return (
    <div className="h-screen flex justify-center items-center">
      <div>
        <img className="w-[25rem]" src={Error} alt="err" />
        <div className="flex justify-center w-full">
          <button
            onClick={() => navigate("/")}
            className="text-white font-semibold bg-primary p-3 px-6 rounded-md"
          >
            Back to home
          </button>
        </div>
      </div>
    </div>
  );
}
