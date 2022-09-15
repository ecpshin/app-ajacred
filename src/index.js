import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import "./geral.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Router>
			<AppRoutes />
		</Router>
	</React.StrictMode>
);
