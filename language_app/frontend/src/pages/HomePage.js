import React, { useContext } from "react";
import AuthContext from "./context/AuthContext";

export default function HomePage() {
	let { user } = useContext(AuthContext);
	return (
		<>
			<h1>homepage </h1>
			{user && <h3>Hey {user.username}</h3>}
		</>
	);
}
