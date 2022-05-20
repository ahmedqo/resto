import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import Cookies from "js-cookie";
import { logoutUser } from "../../actions/UserAction";
import { Container, Flex, Link } from "../../parts";
import { Account, Cart, Menu } from "../../icons";
import { NavLink, DropDown } from ".";
import { GAP } from "../../style";
import { Logo } from "..";

const Navbar = () => {
	const { cartItems } = useSelector((state) => state.cart);
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

	return (
		<header>
			<Container
				xs={{
					padding: "0 1rem",
				}}
				lg={{
					padding: 0,
				}}
			>
				<Flex
					xs={{
						alignItems: "center",
						justifyContent: "space-between",
						flexWrap: "wrap",
						gap: GAP.Large_2,
					}}
				>
					<Link to="/">
						<Logo type="row" />
					</Link>
					<Flex
						xs={{
							alignItems: "center",
							width: "max-content",
							flexWrap: "wrap",
							gap: GAP.Small_2,
						}}
						md={{
							gap: GAP.Large_2,
						}}
					>
						{role !== "admin" && (
							<NavLink to="/menu" label="Menu">
								<Menu />
							</NavLink>
						)}
						{role ? (
							<DropDown links={links} />
						) : (
							<NavLink to="/sign-in" label="Connexion">
								<Account />
							</NavLink>
						)}
						{role !== "admin" && (
							<NavLink to="/cart" label="Panier">
								<Cart items={cartItems.length} />
							</NavLink>
						)}
					</Flex>
				</Flex>
			</Container>
		</header>
	);
};

export default Navbar;
