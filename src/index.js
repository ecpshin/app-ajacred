import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GeralContextProvider } from "./contexts/GeralContext";
import AppRoutes from "./AppRoutes";
import "./geral.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GeralContextProvider>
    <React.StrictMode>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </React.StrictMode>
  </GeralContextProvider>
);
