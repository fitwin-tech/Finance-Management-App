import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import api from "../Api";

const AnaliticsContext = createContext();

export const AnaliticsProvider = ({ children }) => {
  const userDataString = localStorage.getItem("userData");
  const userData = userDataString ? JSON.parse(userDataString) : {};
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${api.userdetails}/${userData.email}`, {
        headers: {
          api_key: api.key,
          authantication: api.authantication,
        },
      })
      .then((response) => {
        setUserDetails(response.data.results);
        setLoading(false);
        console.log(response);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(true);
      });
  }, [userData.email]);

  const formatNumber = (number) => {
    if (number !== undefined) {
      const formattedNumber = parseFloat(number).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      return formattedNumber;
    }
    return "";
  };

  return (
    <AnaliticsContext.Provider
      value={{ userDetails, loading, userData, formatNumber}}
    >
      {children}
    </AnaliticsContext.Provider>
  );
};

export const useAnalitics = () => {
  return useContext(AnaliticsContext);
};
