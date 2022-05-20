import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function ({ title, isProtected = false, isAdmin = false, children }) {
	const user = Cookies.get("token");
	const role = Cookies.get("role");

	useEffect(() => {
		document.title = title;
	}, [title]);

	return <>{isProtected ? !user ? <Navigate to="/sign-in" /> : isAdmin ? role !== "admin" ? <Navigate to="/sign-in" /> : children : children : children}</>;
}
