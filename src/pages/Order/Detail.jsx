import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Title, Box, Flex } from "../../parts";
import { Loader, Table } from "../../components";
import { UserSideBar } from "../../components/SideBar";
import { getOrder, updateOrder } from "../../actions/OrderAction";
import { OrderTable, Stepper } from "../../components/Order";
import { getUser } from "../../actions/UserAction";
import { COLOR, SIZE, GAP } from "../../style";

export default function () {
	const params = useParams();
	const { enqueueSnackbar } = useSnackbar();
	const [order, setOrder] = useState(null);
	const [user, setUser] = useState(null);
	const [load, setLoad] = useState(false);
	const _id = params._id;

	const update = (status, order) => {
		(async () => {
			setLoad(true);
			const [type, data] = await updateOrder({ ...order, status });
			if (type && data) {
				enqueueSnackbar("Enregistré avec succès", { variant: "success" });
			} else {
				enqueueSnackbar(data, { variant: "error" });
			}
			setLoad(false);
		})();
	};

	useEffect(() => {
		(async () => {
			const [type1, data1] = await getOrder(_id);
			const [type2, data2] = await getUser(data1.user._id);
			if (type1) setOrder(data1);
			if (type2) setUser({ user: { ...data2 }, order: { ...data1.shippingInfo } });
		})();
	}, [_id, load]);

	const columns = {
		user: [
			{
				field: "username",
				label: "Utilisateur",
				xs: {
					textAlign: "center",
					width: "33.33%",
				},
			},
			{
				field: "email",
				label: "Email",
				xs: {
					textAlign: "center",
					width: "33.33%",
				},
			},
			{
				field: "phone",
				label: "Tele",
				xs: {
					textAlign: "center",
					width: "33.33%",
				},
			},
		],
		order: [
			{
				field: "address",
				label: "Adresse",
				xs: {
					textAlign: "center",
					width: user?.order?.comment ? "33.33%" : "50%",
				},
			},
			{
				field: "type",
				label: "Type",
				xs: {
					textAlign: "center",
					width: user?.order?.comment ? "33.33%" : "50%",
				},
			},
			...(user?.order?.comment
				? [
						{
							field: "comment",
							label: "Commentaire",
							xs: {
								textAlign: "center",
								width: "33.33%",
							},
						},
				  ]
				: []),
		],
	};

	return (
		<UserSideBar>
			{!order || load ? (
				<Loader />
			) : (
				Object.keys(order).length > 0 && (
					<Flex
						xs={{
							flexDirection: "column",
							width: "100%",
							gap: GAP.Base,
						}}
					>
						<Flex
							xs={{
								flexDirection: "column",
								width: "100%",
								gap: GAP.Large,
							}}
						>
							<Box>
								<Flex
									xs={{
										alignItems: "center",
										justifyContent: "space-between",
										flexDirection: "column",
										gap: GAP.Base,
									}}
									md={{
										flexDirection: "row",
									}}
								>
									<Title
										xs={{
											fontSize: SIZE.Large,
											textAlign: "left",
										}}
										md={{
											fontSize: SIZE.Large_2,
										}}
									>
										#{order._id}
									</Title>
									<Title
										xs={{
											fontSize: SIZE.Large_3,
											color: COLOR.Primary,
										}}
										md={{
											textAlign: "right",
											fontSize: SIZE.Large_5,
										}}
									>
										{order.total} MAD
									</Title>
								</Flex>
							</Box>
							<Box>
								{user && <Table columns={columns.user} data={[user.user]} />}
								{user && <Table columns={columns.order} data={[user.order]} />}
							</Box>
						</Flex>
						<Stepper status={order.status} onClick={update} order={order} />
						<OrderTable items={order.items} />
					</Flex>
				)
			)}
		</UserSideBar>
	);
}
