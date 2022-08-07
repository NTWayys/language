import React, { useContext } from "react";
import { Route, Navigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import AuthContext from "./context/AuthContext";

export default function LoginPage() {
	let { user } = useContext(AuthContext);

	return (
		<>
			{user ? (
				<Navigate to="/" />
			) : (
				[
					<div className="loginPageDiv">
						<div>
							<h1>Block is reserved so I can put a preview kanji card here</h1>
						</div>
						<div>
							<LoginForm />
						</div>
					</div>,
				]
			)}
		</>
	);
}
