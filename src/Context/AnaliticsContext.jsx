import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import api from "../Api";

const AnaliticsContext = createContext();

export const AnaliticsProvider = ({ children }) => {
  const userDataString = localStorage.getItem("userData");
  const userData = userDataString ? JSON.parse(userDataString) : {};
  const [userDetails, setUserDetails] = useState({});
  const [category, setCategory] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
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

        // Add the second API call after the first one
        return axios.get(`${api.category}/${userData.id}`, {
          headers: {
            api_key: api.key,
            authantication: api.authantication,
          },
        });
      })
      .then((categoryResponse) => {
        setCategory(categoryResponse.data.categories);
        console.log(categoryResponse);

        // Add the third API call here
        return axios.get(`${api.category}/all/${userData.id}`, {
          headers: {
            api_key: api.key,
            authantication: api.authantication,
          },
        });
      })
      .then((categoryListResponse) => {
        setCategoryList(categoryListResponse.data.categories);
        console.log(categoryListResponse);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(true);
      });
  }, [userData.email, userData.id]);

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
      value={{ userDetails, loading, userData, formatNumber, category , categoryList}}
    >
      {children}
    </AnaliticsContext.Provider>
  );
};

export const useAnalitics = () => {
  return useContext(AnaliticsContext);
};
