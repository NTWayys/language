import React, { useContext, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthContext  from "./pages/context/AuthContext";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./pages/components/Navbar";
import HiraganaPage from "./pages/HiraganaPage";
import KatakanaPage from "./pages/KatakanaPage"


export default function App() {
	let { user, authTokens } = useContext(AuthContext) 
	let [userCompleted, setUserCompleted] = useState({
		body: [],
		id: null,
		user: null,
	});

	useEffect(() => {
		getCompleted();
	}, []);

	let userCompletedItem = (item) => {
		setUserCompleted((prevCompleted) => {
			const completedArr = prevCompleted.body;
			if (item.target.checked) {
				completedArr.push(item.target.id);
			} else {
				var index = completedArr.indexOf(item.target.id);
				if (index !== -1) {
					completedArr.splice(index, 1);
				}
			}
			return {
				...prevCompleted,
				body: completedArr,
			};
		});
	};
	let getCompleted = async () => {
		let response = await fetch(`/api/account/items/`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${authTokens.access}`,
			},
		});
		let data = await response.json();

		if (response.status === 200) {
			setUserCompleted(data);
		} else if (response.statusText === "Unauthorized") {
			console.log("not logged in");
		}
	};

	return (
		<>
					<Navbar />
					<Routes>
						<Route path="" exact element={<HomePage />} />
						<Route path="login/" element={<LoginPage />} />
						<Route path="japanese/hiragana/" element={<HiraganaPage userCompleted={userCompleted} />} />
						<Route path="japanese/katakana/" element={<KatakanaPage userCompleted={userCompleted} />} />
					</Routes>
		</>
	);
}
