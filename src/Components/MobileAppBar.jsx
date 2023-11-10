import React from "react";
import { AiFillHome } from "react-icons/ai";
import { BsBrowserEdge } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { IoMdSettings, IoIosAddCircle } from "react-icons/io";
import { useNavigate, useLocation } from "react-router-dom";

export default function MobileAppBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("userData");
    navigate("/login");
  };

  return (
    <div className="bg-[#002C45] fixed bottom-0 w-full items-end p-2 py-3 sm:flex md:hidden">
      <div className="flex text-white space-x-7 w-full justify-center">
        <div
          onClick={() => navigate("/")}
          className={`space-y-1 ${
            location.pathname === "/" ? "text-mobilebuttonactive" : ""
          }`}
        >
          <div className="flex items-center justify-center w-full">
            <AiFillHome className="text-[1.5rem]" />
          </div>
          <p className="text-subtitle">Home</p>
        </div>

        <div
          onClick={() => navigate("/transactions")}
          className={`space-y-1 ${
            location.pathname === "/transactions"
              ? "text-mobilebuttonactive"
              : ""
          }`}
        >
          <div className="flex items-center justify-center w-full">
            <BsBrowserEdge className="text-[1.5rem]" />
          </div>
          <p className="text-subtitle">Analitics</p>
        </div>

        <div
          onClick={() => navigate("/addnew")}
          className={`space-y-1 ${
            location.pathname === "/addnew" ? "text-mobilebuttonactive" : ""
          }`}
        >
          <div className="flex items-center justify-center w-full">
            <IoIosAddCircle className="text-[1.5rem]" />
          </div>
          <p className="text-subtitle">Add</p>
        </div>

        <div
          onClick={() => navigate("/settings")}
          className={`space-y-1 ${
            location.pathname === "/settings" ? "text-mobilebuttonactive" : ""
          }`}
        >
          <div className="flex items-center justify-center w-full">
            <IoMdSettings className="text-[1.5rem]" />
          </div>
          <p className="text-subtitle">Settings</p>
        </div>

        <div onClick={logout} className="space-y-1">
          <div className="flex items-center justify-center w-full">
            <BiLogOut className="text-[1.5rem]" />
          </div>
          <p className="text-subtitle">Log out</p>
        </div>
      </div>
    </div>
  );
}
