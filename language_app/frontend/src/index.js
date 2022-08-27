import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./pages/context/AuthContext";
import App from "./App";


function Index() {

	return (
		<>
			<BrowserRouter>
				<AuthProvider>
					<App />
				</AuthProvider> 
			</BrowserRouter>
		</>
	);
}

ReactDOM.createRoot(document.getElementById("appRoot")).render(<Index />);
