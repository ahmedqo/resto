import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Title, Image, Flex } from "../../parts";
import { Loader, Table, Button } from "../../components";
import { UserSideBar } from "../../components/SideBar";
import { deleteOrder, getOrders } from "../../actions/OrderAction";
import { COLOR, RADIUS, SIZE, GAP, FONT } from "../../style";
import { Pen, Times } from "../../icons";
import { getUser } from "../../actions/UserAction";

function setColor(type) {
	let color;
	switch (type) {
		case -1:
			color = "#EF4444";
			break;
		case 0:
			color = "#FACF85";
			break;
		case 1:
			color = "#9DC1FB";
			break;
		case 2:
			color = "#8B93BD";
			break;
		case 3:
			color = "#88DCC0";
			break;
		default:
			color = "#1D1D1D";
			break;
	}
	return color;
}

function setStatus(type) {
	let status;
	switch (type) {
		case -1:
			status = "Annulé";
			break;
		case 0:
			status = "En attente";
			break;
		case 1:
			status = "Confirmé";
			break;
		case 2:
			status = "Préparé";
			break;
		case 3:
			status = "Terminé";
			break;
		default:
			status = "En attente";
			break;
	}
	return status;
}

export default function () {
	const navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();
	const [orders, setOrders] = useState(null);
	const [load, setLoad] = useState(false);

	const remove = (id) => {
		(async () => {
			setLoad(true);
			const [type, data] = await deleteOrder(id);
			if (type && data) {
				enqueueSnackbar("Supprimer avec succès", { variant: "success" });
			} else {
				enqueueSnackbar(data, { variant: "error" });
			}
			setLoad(false);
		})();
	};

	useEffect(() => {
		(async () => {
			setOrders(null);
			const [type1, data1] = await getOrders();
			if (type1) {
				const ords = await Promise.all(
					data1.map(async (ord) => {
						const [type2, data2] = await getUser(ord.user);
						if (type2) return { ...ord, username: data2.username };
						return ord;
					})
				);
				setOrders(ords);
			}
		})();
	}, [load]);

	const columns = [
		{
			field: "_id",
			label: "#ID",
			render: (prop) => <Title xs={{ fontSize: SIZE.Small, width: "max-content" }}>#{prop._id}</Title>,
			xs: {
				width: 160,
			},
		},
		{
			field: "username",
			label: "Utilisateur",
			render: (prop) => prop.username,
			xs: {
				textAlign: "center",
			},
		},
		{
			field: "total",
			label: "Total",
			render: (prop) => prop.total + " MAD",
			xs: {
				textAlign: "center",
			},
		},
		{
			field: "type",
			label: "Type",
			render: (prop) => prop.shippingInfo.type,
			xs: {
				textAlign: "center",
			},
		},
		{
			field: "status",
			label: "Status",
			render: (prop) => (
				<Title
					xs={{
						background: setColor(prop.status),
						borderRadius: RADIUS.Large,
						width: "max-content",
						fontSize: SIZE.Small,
						color: COLOR.White,
						padding: "4px 10px",
						pointerEvent: "none",
						margin: "auto",
					}}
					md={{
						borderRadius: RADIUS.Large_2,
					}}
				>
					{setStatus(prop.status)}
				</Title>
			),
			xs: {
				textAlign: "center",
			},
		},
		{
			field: "action",
			label: "",
			render: (prop) => (
				<Flex xs={{ gap: GAP.Small }}>
					<Button
						xs={{
							width: 14,
							height: 14,
							padding: 0,
							background: "transparent",
						}}
						md={{ width: 14, height: 14 }}
						onClick={() => {
							remove(prop._id);
						}}
					>
						<Times color={COLOR.Error} size={"14px"} />
					</Button>
					<Button
						xs={{
							width: 14,
							height: 14,
							padding: 0,
							background: "transparent",
						}}
						md={{ width: 14, height: 14 }}
						onClick={() => {
							navigate("/admin/order/detail/" + prop._id);
						}}
					>
						<Pen size={"14px"} color={COLOR.Primary} />
					</Button>
				</Flex>
			),
			xs: {
				width: 40,
				textAlign: "center",
			},
		},
	];

	return (
		<UserSideBar>
			<Flex
				xs={{
					marginBottom: 20,
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				<Title
					xs={{
						fontWeight: FONT.Large_5,
						fontSize: SIZE.Large_3,
					}}
					md={{
						fontSize: SIZE.Large_4,
					}}
				>
					Liste De Commandes
				</Title>
			</Flex>
			{!orders || load ? (
				<Loader />
			) : orders.length === 0 ? (
				<Image src={"/asset/none.png"} xs={{ width: "260px" }} md={{ width: "400px" }} />
			) : (
				<Table columns={columns} data={orders} />
			)}
		</UserSideBar>
	);
}
