import React, { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Logo from "../Assets/logo-with-text.png";

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="text-black flex justify-center items-center h-screen">
      <div
        onClick={() => navigate("/")}
        className="flex items-center space-x-2 absolute top-4 left-4 cursor-pointer"
      >
        <BiArrowBack className="text-header" />
        <p> Go Back</p>
      </div>
      <div className="w-full max-w-login border rounded-lg p-4 py-8">
        <div className="space-y-4">
          <div className="flex justify-center">
            <img src={Logo} alt="logo" className="w-[12rem]" />
          </div>
          <p className="text-title2 font-bold text-center">
            Sign in or create an account
          </p>
          <div className="space-y-4">
            <div className="w-full space-y-2">
              <p>Email Address</p>
              <input
                type="email"
                placeholder="Enter your Email Address"
                className="border border-black/[.50] rounded-default p-2 w-full outline-none"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="w-full space-y-2">
              <p>Password</p>
              <input
                type="email"
                placeholder="Enter your password"
                className="border border-black/[.50] rounded-default p-2 w-full outline-none"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="flex justify-end">
                <p>Forgot Password?</p>
            </div>
            <div>
              <button
                //onClick={handleSignUp}
                disabled={isLoading}
                className="bg-primary hover:bg-button_hover text-white w-full p-3 rounded-default text-subtitle3"
              >
                {isLoading ? "Loading..." : "Login"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
