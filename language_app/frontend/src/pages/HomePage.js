import React, { useContext } from "react";
import AuthContext from "./context/AuthContext";

export default function HomePage() {
	let { user } = useContext(AuthContext);
	return <>{user && <h1>this is: {user.username}</h1>}</>;
}
