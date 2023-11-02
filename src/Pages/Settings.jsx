import React from "react";
import Header from "../Components/Header";
import Banner from "../Assets/banner.jpg";
import { AnaliticsProvider } from "../Context/AnaliticsContext";

export default function Settings() {
  const userDataString = localStorage.getItem("userData");
  const userData = userDataString ? JSON.parse(userDataString) : {};

  return (
    <AnaliticsProvider>
      <div>
        <Header />
        <div
          className="bg-cover bg-center h-72 flex items-center justify-center" // You can adjust the height and other classes as needed
          style={{ backgroundImage: `url(${Banner})` }}
        >
          <div className="max-w-primary w-full">
            <h1 className="text-white text-4xl font-bold px-20 ">Settings</h1>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="max-w-primary w-full px-20">
            <div className="text-title font-semibold py-4 border-b border-black/[.15]">
              <h1>Personal Details</h1>
            </div>
            <div className="space-y-4">
              <div className="flex items-center w-full mt-4">
                <div className="w-[20%]">
                  <h1 className="font-semibold">Profile Image</h1>
                </div>
                <div className="w-[80%] flex items-center space-x-4">
                  <img
                    src="https://www.shareicon.net/data/512x512/2016/09/15/829452_user_512x512.png"
                    alt="profile"
                    className="w-[4rem]"
                  />
                  <p className="text-primary font-semibold">Update</p>
                </div>
              </div>

              <div className="flex items-center w-full">
                <div className="w-[20%]">
                  <h1 className="font-semibold capitalize">username</h1>
                </div>
                <div className="w-[80%] flex items-center space-x-4">
                  <div className="max-w-[500px] w-full">
                    <input
                      disabled
                      value={"username"}
                      className="border p-2 rounded-md bg-white_hover w-full"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center w-full">
                <div className="w-[20%]">
                  <h1 className="font-semibold capitalize">Currency</h1>
                </div>
                <div className="w-[80%] flex items-center space-x-4">
                  <div className="max-w-[500px] w-full">
                    <input
                      disabled
                      value={userData.currency}
                      className="border p-2 rounded-md bg-white_hover w-full font-semibold text-black/[.60]"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center w-full">
                <div className="w-[20%]">
                  <h1 className="font-semibold capitalize">
                    First name & last name
                  </h1>
                </div>
                <div className="w-[80%] flex items-center space-x-4">
                  <div className="max-w-[500px] w-full flex space-x-4">
                    <input
                      type="text"
                      placeholder="First Name"
                      className="border p-2 rounded-md w-full outline-none"
                    />
                    <input
                      type="text"
                      placeholder="First Name"
                      className="border p-2 rounded-md w-full outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center w-full">
                <div className="w-[20%]">
                  <h1 className="font-semibold capitalize">Email Address</h1>
                </div>
                <div className="w-[80%] flex items-center space-x-4">
                  <div className="max-w-[500px] w-full flex space-x-4">
                    <input
                      type="text"
                      placeholder="Email Address"
                      className="border p-2 rounded-md w-full outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="text-title font-semibold py-4 border-b border-black/[.15]">
              <h1>Password & Security</h1>
            </div>
            <div className="space-y-4 mt-4">
              <div className="flex items-center w-full">
                <div className="w-[20%]">
                  <h1 className="font-semibold capitalize">Currant Password</h1>
                </div>
                <div className="w-[80%] flex items-center space-x-4">
                  <div className="max-w-[500px] w-full flex space-x-4">
                    <input
                      type="password"
                      placeholder="Enter your Currant Password"
                      className="border p-2 rounded-md w-full outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center w-full">
                <div className="w-[20%]">
                  <h1 className="font-semibold capitalize">New Password</h1>
                </div>
                <div className="w-[80%] flex items-center space-x-4">
                  <div className="max-w-[500px] w-full flex space-x-4">
                    <input
                      type="password"
                      placeholder="Enter your New Password"
                      className="border p-2 rounded-md w-full outline-none"
                    />
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      className="border p-2 rounded-md w-full outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnaliticsProvider>
  );
}
