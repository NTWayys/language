import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import jwt_decode from "jwt-decode";
const AuthContext = createContext();
export default AuthContext;



export const AuthProvider = ({ children }) => {
	let [authTokens, setAuthTokens] = useState(() =>
		localStorage.getItem("authTokens")
			? JSON.parse(localStorage.getItem("authTokens"))
			: null
	);
	let [user, setUser] = useState(() =>
		localStorage.getItem("authTokens")
			? jwt_decode(localStorage.getItem("authTokens"))
			: null
	);
	let [loading, setLoading] = useState(true);

	let navigate = useNavigate();

	let loginUser = async (e) => {
		e.preventDefault();
		let response = await fetch("/api/account/token/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: e.target.username.value,
				password: e.target.password.value,
			}),
		});

		let data = await response.json();
		if (response.status === 200) {
			setAuthTokens(data);
			setUser(jwt_decode(data.access));
			localStorage.setItem("authTokens", JSON.stringify(data));
			navigate("/");
		} else {
			alert("Something failed");
		}
	};

	let logoutUser = () => {
		setAuthTokens(null);
		setUser(null);
		localStorage.removeItem("authTokens");
		navigate("/");
	};

	let updateToken = async () => {
		let response = await fetch("/api/account/token/refresh/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				refresh: authTokens.refresh,
			}),
		});

		let data = await response.json();
		if (response.status === 200) {
			setAuthTokens(data);
			setUser(jwt_decode(data.access));
			localStorage.setItem("authTokens", JSON.stringify(data));
		} else {
			logoutUser();
		}
	};
	

	useEffect(() => {
		const fourandhalfmins = 240000;
		let interval = setInterval(() => {
			if (authTokens) {
				updateToken();
			}
		}, fourandhalfmins);
		return () => clearInterval(interval);
	}, [authTokens, loading]);
	useEffect(() =>{
		updateToken()
	},[])
	
	
	let contextData = {
		user: user,
		loading:loading,
		authTokens: authTokens,
		updateToken:updateToken,
		loginUser: loginUser,
		logoutUser,
	};

	return (
		<AuthContext.Provider value={contextData}> {children}</AuthContext.Provider>
	);
};

