import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../context/AuthContext";

export default function Navbar() {
	let { user, logoutUser } = useContext(AuthContext);
	return (
		<>
			<nav className="navbar ">
				<div className="container">
					<div>
						<NavLink to="/">ASDFGHJKL</NavLink>
					</div>
					<div className="navItems">
						<NavLink to="japanese/hiragana/">Hiragana</NavLink>
						<NavLink to="japanese/katakana/">Katakana</NavLink>
						<NavLink to="japanese/kanji/">Kanji</NavLink>
						<input id="wordSearch" type="text" />
						<button id="submitBtn">Search</button>
					</div>
					{user ? (
						<a onClick={logoutUser}>Logout</a>
					) : (
						<NavLink to="login/">login</NavLink>
					)}
				</div>
			</nav>
		</>
	);
}
