import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Title, Flex, Box } from "../../parts";
import { FONT, SIZE, GAP, COLOR } from "../../style";
import { TextField, FileField, AreaField, SelectField } from "../../components/Feilds";
import { Button, Loader } from "../../components";
import { UserSideBar } from "../../components/SideBar";
import { createProduct } from "../../actions/ProductAction";
import { getCuisines } from "../../actions/CuisineAction";
import { Tag } from "../../components/Product";
import { Arrow } from "../../icons";

export default function () {
	const navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();
	const [product, setProduct] = useState({ name: "", images: "", price: "", cuisine: "", description: "", ingredients: [] });
	const [cuisines, setCuisines] = useState(null);
	const [load, setLoad] = useState(false);
	const [tag, setTag] = useState("");

	const create = () => {
		if (
			!product.name.length ||
			!product.price.length ||
			!product.description.length ||
			!product.images.length ||
			!product.ingredients.length ||
			!product.cuisine.value
		) {
			enqueueSnackbar("Tous les champs sont requis", { variant: "error" });
			return;
		}
		(async () => {
			setLoad(true);
			const [type, data] = await createProduct({ ...product, cuisine: product.cuisine.value });
			if (type && data) {
				enqueueSnackbar("Créé avec succès", { variant: "success" });
				navigate("/admin/products");
			} else {
				enqueueSnackbar(data, { variant: "error" });
			}
			setLoad(false);
		})();
	};

	const down = (e) => {
		const { key } = e;
		const val = tag.trim();
		if ((key === "," || key === "Enter") && val.length && !product?.ingredients?.includes(val)) {
			e.preventDefault();
			setProduct({ ...product, ingredients: [...product?.ingredients, val] });
			setTag("");
		}
	};

	const remove = (e) => {
		var data = product.ingredients;
		data.splice(e, 1);
		setProduct({ ...product, ingredients: data });
	};

	useEffect(() => {
		(async () => {
			const [type, data] = await getCuisines();
			if (type) {
				setCuisines(data.map((el) => ({ value: el._id, text: el.label })));
			}
		})();
	}, [load]);

	return (
		<UserSideBar>
			<Flex
				xs={{
					flexDirection: "column",
					gap: GAP.Base,
				}}
			>
				<Box
					xs={{
						marginBottom: 20,
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
						Nouveau Produit
					</Title>
				</Box>
				{load ? (
					<Loader />
				) : (
					<>
						<FileField
							label="Image"
							holder={"/asset/holder.png"}
							value={product?.images}
							changed={(e) => setProduct({ ...product, images: e })}
						/>
						<TextField type="text" label="Titre" value={product?.name} changed={(e) => setProduct({ ...product, name: e.target.value })} />
						<TextField type="text" label="Prix" value={product?.price} changed={(e) => setProduct({ ...product, price: e.target.value })} />
						<SelectField
							label="Cuisine"
							options={cuisines}
							value={product?.cuisine}
							changed={(e) => setProduct({ ...product, cuisine: e })}
							suffix={<Arrow color={COLOR.Primary} />}
						/>
						<Flex xs={{ gap: GAP.Small, flexWrap: "wrap" }}>
							<TextField type="text" label="Ingredients" value={tag} onKeyDown={down} changed={(e) => setTag(e.target.value)} />
							{product?.ingredients.map((el, i) => (
								<Tag key={i} clicked={() => remove(i)}>
									{el}
								</Tag>
							))}
						</Flex>
						<AreaField
							type="text"
							label="Description"
							value={product?.description}
							changed={(e) => setProduct({ ...product, description: e.target.value })}
						/>
						<Flex
							xs={{
								alignItems: "flex-end",
								flexDirection: "column",
								flexWrap: "wrap",
							}}
						>
							<Button onClick={create}>Créer</Button>
						</Flex>
					</>
				)}
			</Flex>
		</UserSideBar>
	);
}
