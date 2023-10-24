import React, { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Logo from "../Assets/logo-with-text.png";
import axios from "axios";
import api from "../Api";

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessege, setErrorMessege] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userDataString = localStorage.getItem("userData");
  const userData = userDataString ? JSON.parse(userDataString) : {};
  const Token = userData.accessToken;

  useEffect(() => {
    if (Token) {
      navigate("/");
    }
  }, [Token, navigate]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    console.log("handleLogin function called");
    console.log(email, password);
    try {
      const response = await axios.post(
        api.login,
        {
          email,
          password,
        },
        {
          headers: {
            api_key: api.key,
            authantication: api.authantication,
          },
          body: JSON.stringify({ email, password }),
        }
      );

      console.log("Login response:", response);

      const accessToken = response.data.accessToken;
      const data = response.data;

      if (accessToken) {
        // Successfully logged in, set the token using setToken function
        localStorage.setItem("userData", JSON.stringify(data));
        navigate("/");
      } else {
        console.error("Login failed with access token");
        setErrorMessege("Username or password incorrect");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessege("Username or password incorrect");
    } finally {
      setIsLoading(false);
    }
  };

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
          <p className="text-title font-semibold text-center">Log in</p>
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
                type="password"
                placeholder="Enter your password"
                className="border border-black/[.50] rounded-default p-2 w-full outline-none"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    handleLogin(e);
                  }
                }}
              />
            </div>
            <div>{errorMessege ? <p className="text-primarysize text-red-500">{errorMessege}</p> : ""}</div>
            <div className="flex justify-end">
              <p>Forgot Password?</p>
            </div>
            <div>
              <button
                onClick={handleLogin}
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
