import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import Cookies from "js-cookie";
import { logoutUser } from "../../actions/UserAction";
import { SideBar } from ".";

export default function ({ children }) {
	const navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();
	const [role, setRole] = useState(Cookies.get("role"));

	const logout = () => {
		(async () => {
			await logoutUser();
			enqueueSnackbar("Deconnexion avec success", { variant: "success" });
			navigate("/sign-in");
		})();
	};

	useEffect(() => {
		setRole(Cookies.get("role"));
	});

	const links = [
		...(role === "admin"
			? [
					{
						to: "/admin/dashboard",
						text: "Dashboard",
					},
			  ]
			: []),
		{
			to: "/me",
			text: "Profile",
		},
		...(role === "admin"
			? [
					{
						to: "/admin/users",
						text: "Utilisateurs",
					},
					{
						to: "/admin/cuisines",
						text: "Cuisines",
					},
					{
						to: "/admin/products",
						text: "Produits",
					},
			  ]
			: []),
		{
			to: role === "admin" ? "/admin/orders" : "/orders",
			text: "Commandes",
		},
		{
			to: "/sign-out",
			text: "Deconnexion",
			onClick: (e) => {
				e.preventDefault();
				logout();
			},
		},
	];

	return <SideBar links={links}>{children}</SideBar>;
}
