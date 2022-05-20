import React, { useState, useEffect } from "react";
import { Title, Image } from "../../parts";
import { RADIUS } from "../../style";
import { Table } from "../../components";
import { getProduct } from "../../actions/ProductAction";
import Loader from "../Loader";

export default function ({ items }) {
	const [products, setProducts] = useState(null);

	useEffect(() => {
		var rows = [];
		items.forEach(async (itm) => {
			const [type, data] = await getProduct(itm.product);
			if (type) {
				rows = [...rows, { ...data, quantity: itm.quantity }];
				setProducts(rows);
			}
		});
	}, [items]);

	const columns = [
		{
			field: "image",
			label: "Image",
			render: (prop) => (
				<Image
					src={prop.images[0].url}
					xs={{
						borderRadius: RADIUS.Large,
						margin: "0",
						width: 50,
						height: 50,
					}}
					md={{
						borderRadius: RADIUS.Large_2,
					}}
				/>
			),
			xs: {
				width: 80,
				textAlign: "center",
				padding: "5px 20px",
			},
		},
		{
			field: "name",
			label: "Titre",
			render: (prop) => <Title>{prop.name}</Title>,
			xs: {
				minWidth: 200,
			},
		},
		{
			field: "quantity",
			label: "Quantite",
			render: (prop) => <Title xs={{ width: "max-content", margin: "auto" }}>{prop.quantity}</Title>,
			xs: {
				textAlign: "center",
				verticalAlign: "middle",
				minWidth: 100,
			},
		},
		{
			field: "price",
			label: "Prix",
			render: (prop) => <Title xs={{ width: "max-content", margin: "auto" }}>{prop.price * prop.quantity + " MAD"}</Title>,
			xs: {
				textAlign: "center",
				minWidth: 100,
			},
		},
	];

	return !products ? <Loader /> : <Table columns={columns} data={products} />;
}
