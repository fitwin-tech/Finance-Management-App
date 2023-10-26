import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AnaliticsProvider } from "./Context/AnaliticsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AnaliticsProvider>
      <App />
    </AnaliticsProvider>
  </React.StrictMode>
);

reportWebVitals();
