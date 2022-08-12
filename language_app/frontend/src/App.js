import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./pages/context/AuthContext";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { PrivateRoute } from "./pages/components/PrivateRoute";
import Navbar from "./pages/components/Navbar";
import HiraganaPage from "./pages/HiraganaPage";

function App() {
	return (
		<>
			<BrowserRouter>
				<AuthProvider>
					<Navbar />
					<Routes>
						<Route path="" exact element={<HomePage />} />
						<Route path="login/" element={<LoginPage />} />
						<Route path="japanese/hiragana/" element={<HiraganaPage />} />
					</Routes>
				</AuthProvider>{" "}
			</BrowserRouter>
		</>
	);
}

ReactDOM.createRoot(document.getElementById("appRoot")).render(<App />);
