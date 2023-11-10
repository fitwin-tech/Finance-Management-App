import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import axios from "axios";
import "./App.css";

//Compornents and Pages
import Home from "./Pages/Home";
import Error404 from "./Pages/Error404";
import Login from "./Pages/Login";
import Transactions from "./Pages/Transactions";
import Categories from "./Pages/Categories";
import Settings from "./Pages/Settings";
import Signup from "./Pages/Signup";
import AddNewTransactionPage from "./Pages/AddNewTransactionPage";

export default function App() {
  // Initialize userData to an empty object to avoid undefined errors
  const userData = JSON.parse(localStorage.getItem("userData")) || {};
  const ACCESS_TOKEN = userData.accessToken;
  const REFRESH_TOKEN = userData.refreshToken;

  useEffect(() => {
    if (ACCESS_TOKEN) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${ACCESS_TOKEN}`;
      axios.defaults.headers.common["User-Rt"] = `${REFRESH_TOKEN}`;
      document.cookie = `at=${ACCESS_TOKEN}`;

      // Set a timer to clear local storage after 1 hour
      const clearLocalStorageAfter1Hour = () => {
        localStorage.removeItem("userData");
        document.cookie = "at=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      };

      // Set the timer for 1 hour (3600 seconds)
      const oneHour = 3600 * 1000; // 3600 seconds * 1000 milliseconds
      setTimeout(clearLocalStorageAfter1Hour, oneHour);
    }
  }, [ACCESS_TOKEN, REFRESH_TOKEN]);

  const ProtectedRoute = ({ redirectPath = "/login" }) => {
    const userData = JSON.parse(localStorage.getItem("userData")) || {};
    const ACCESS_TOKEN = userData.accessToken;

    if (!ACCESS_TOKEN) {
      return <Navigate to={redirectPath} replace />;
    }

    return <Outlet />;
  };
  return (
    <Router>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="*" element={<Error404 />} />
        <Route element={<ProtectedRoute />}>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/transactions" element={<Transactions/>} />
          <Route exact path="/categories" element={<Categories/>} />
          <Route exact path="/settings" element={<Settings/>} />
          <Route exact path="/addnew" element={<AddNewTransactionPage/>} />
        </Route>
      </Routes>
    </Router>
  );
}
