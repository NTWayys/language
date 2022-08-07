import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function LoginForm() {
	let { loginUser } = useContext(AuthContext);

	return (
		<>
			<form className="login-form" onSubmit={loginUser}>
				<input
					className="form-username"
					type="text"
					name="username"
					placeholder="Enter Username"
				/>
				<input
					className="form-password"
					type="password"
					name="password"
					placeholder="Enter Password"
				/>
				<input className="form-submit-btn" type="submit" value="Login" />
				<button className="register-btn">Register</button>
			</form>
		</>
	);
}
