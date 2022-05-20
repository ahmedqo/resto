import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { UserSideBar } from "../components/SideBar";
import { getOrders } from "../actions/OrderAction";
import { Image } from "../parts";

function getDays() {
	var curr = new Date();
	var first = curr.getDate() - curr.getDay();
	var days = [];
	for (var i = -7; i < 1; i++) {
		var next = new Date(curr.getTime());
		next.setDate(first + i);
		days.push(next.toString().slice(0, 10));
	}
	return days;
}

export default function () {
	const [orders, setOrders] = useState(null);
	const days = getDays();
	const termine = days
		.map((m, i) =>
			orders?.filter((od) => new Date(od.createdAt).toString().slice(0, 10) === m && od.status === 3).reduce((total, od) => total + od.total, 0)
		)
		.reduce((a, e) => a + e, 0);
	const prepare = days
		.map((m, i) =>
			orders?.filter((od) => new Date(od.createdAt).toString().slice(0, 10) === m && od.status === 2).reduce((total, od) => total + od.total, 0)
		)
		.reduce((a, e) => a + e, 0);
	const confirm = days
		.map((m, i) =>
			orders?.filter((od) => new Date(od.createdAt).toString().slice(0, 10) === m && od.status === 1).reduce((total, od) => total + od.total, 0)
		)
		.reduce((a, e) => a + e, 0);
	const attente = days
		.map((m, i) =>
			orders?.filter((od) => new Date(od.createdAt).toString().slice(0, 10) === m && od.status === 0).reduce((total, od) => total + od.total, 0)
		)
		.reduce((a, e) => a + e, 0);
	const annulee = days
		.map((m, i) =>
			orders?.filter((od) => new Date(od.createdAt).toString().slice(0, 10) === m && od.status === -1).reduce((total, od) => total + od.total, 0)
		)
		.reduce((a, e) => a + e, 0);

	const lineState = {
		labels: days,
		datasets: [
			...(!isNaN(termine) && termine > 0
				? [
						{
							label: "Terminé",
							borderColor: "#88DCC0",
							backgroundColor: "#88DCC0",
							data: days.map((m, i) =>
								orders
									?.filter((od) => new Date(od.createdAt).toString().slice(0, 10) === m && od.status === 3)
									.reduce((total, od) => total + od.total, 0)
							),
						},
				  ]
				: []),
			...(!isNaN(prepare) && prepare > 0
				? [
						{
							label: "Préparé",
							borderColor: "#8B93BD",
							backgroundColor: "#8B93BD",
							data: days.map((m, i) =>
								orders
									?.filter((od) => new Date(od.createdAt).toString().slice(0, 10) === m && od.status === 2)
									.reduce((total, od) => total + od.total, 0)
							),
						},
				  ]
				: []),
			...(!isNaN(confirm) && confirm > 0
				? [
						{
							label: "Confirmé",
							borderColor: "#9DC1FB",
							backgroundColor: "#9DC1FB",
							data: days.map((m, i) =>
								orders
									?.filter((od) => new Date(od.createdAt).toString().slice(0, 10) === m && od.status === 1)
									.reduce((total, od) => total + od.total, 0)
							),
						},
				  ]
				: []),
			...(!isNaN(attente) && attente > 0
				? [
						{
							label: "En attente",
							borderColor: "#FACF85",
							backgroundColor: "#FACF85",
							data: days.map((m, i) =>
								orders
									?.filter((od) => new Date(od.createdAt).toString().slice(0, 10) === m && od.status === 0)
									.reduce((total, od) => total + od.total, 0)
							),
						},
				  ]
				: []),
			...(!isNaN(annulee) && annulee > 0
				? [
						{
							label: "Annulé",
							borderColor: "#EF4444",
							backgroundColor: "#EF4444",
							data: days.map((m, i) =>
								orders
									?.filter((od) => new Date(od.createdAt).toString().slice(0, 10) === m && od.status === -1)
									.reduce((total, od) => total + od.total, 0)
							),
						},
				  ]
				: []),
		],
	};

	useEffect(() => {
		(async () => {
			const [type, data] = await getOrders();
			if (type) {
				setOrders(data);
			}
		})();
	}, []);

	return (
		<UserSideBar>
			{orders &&
				(lineState.datasets.length > 0 ? (
					<Line data={lineState} />
				) : (
					<Image src={"/asset/none.png"} xs={{ width: "260px" }} md={{ width: "400px" }} />
				))}
		</UserSideBar>
	);
}
