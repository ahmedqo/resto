import React, { useState } from "react";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RADIUS, COLOR, GAP } from "../../style";
import { TextField, SelectField, AreaField } from "../Feilds";
import { createOrder } from "../../actions/OrderAction";
import { clearCart, saveShippingInfo } from "../../actions/CartAction";
import { Arrow } from "../../icons";
import { Flex } from "../../parts";
import { Button, Loader } from "..";

export default function ({ info, items, total }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { enqueueSnackbar } = useSnackbar();
	const [shipping, setShipping] = useState({ address: "", type: { value: null, text: "" }, comment: "", ...info });
	const [load, setLoad] = useState(false);

	const order = () => {
		if (!shipping?.address?.length || shipping?.type?.value === null) {
			enqueueSnackbar("Tous les champs sont requis", { variant: "error" });
			return;
		}
		(async () => {
			setLoad(true);
			const [type, data] = await createOrder({
				shippingInfo: { ...shipping, type: shipping.type.text },
				items: items,
				total: total,
			});
			if (type && data) {
				enqueueSnackbar("Placer avec succès", { variant: "success" });
				dispatch(saveShippingInfo(shipping));
				dispatch(clearCart());
				navigate("/orders");
			} else {
				enqueueSnackbar(data, { variant: "error" });
			}
			setLoad(false);
			return;
		})();
	};

	return load ? (
		<Loader />
	) : (
		<Flex
			xs={{
				flexDirection: "column",
				alignItems: "center",
				gap: GAP.Base,
				borderRadius: RADIUS.Large,
			}}
			md={{
				gap: GAP.Large,
				borderRadius: RADIUS.Large_2,
			}}
		>
			<TextField type="text" label="Adresse" value={shipping.address} changed={(e) => setShipping({ ...shipping, address: e.target.value })} />
			<SelectField
				label="Type"
				value={shipping.type}
				options={[
					{
						value: 0,
						text: "Emporter",
					},
					{
						value: 1,
						text: "Livrer",
					},
				]}
				changed={(e) => setShipping({ ...shipping, type: e })}
				suffix={<Arrow color={COLOR.Primary} />}
			/>
			<AreaField type="text" label="Commentaire" value={shipping.comment} changed={(e) => setShipping({ ...shipping, comment: e.target.value })} />
			<Button md={{ width: "100%" }} onClick={order}>
				Commander
			</Button>
		</Flex>
	);
}
