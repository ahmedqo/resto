import React, { useState } from "react";
import styled from "styled-components";
import { COLOR, SIZE, FONT, GAP, RADIUS } from "../../style";
import { Flex, Box, Link, Title } from "../../parts";
import { Account, Times } from "../../icons";

var Wrap = styled(Box)`
	position: relative;
	&.active,
	&:hover {
		label {
			color: ${COLOR.Primary};
		}
		svg {
			fill: ${COLOR.Primary};
		}
	}
`;

var Label = styled.label`
	display: none;
	font-size: ${SIZE.Large};
	font-weight: ${FONT.Large_3};
	color: ${COLOR.Black};
	cursor: pointer;
	@media (min-width: 768px) {
		display: block;
	}
`;

var BFlex = styled(Flex)`
	cursor: pointer;
	svg {
		pointer-events: none;
	}
`;

var NavLink = styled(Link)`
	padding: 10px;
	font-size: ${SIZE.Large_2};
	color: ${COLOR.Black};
	border-radius: ${RADIUS.Large};
	&.active {
		color: ${COLOR.White};
		background: ${COLOR.Primary};
	}
	&:hover {
		color: ${COLOR.Black};
		background: ${COLOR.Primary}50;
	}
	@media (min-width: 768px) {
		padding: 4px 6px;
		font-size: ${SIZE.Large};
	}
`;

var Block = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-bewteen;
	padding: 0 20px 10px 20px;
	width: calc(100% + 20px);
	margin-bottom: 10px;
	position: relative;
	left: -10px;
	box-shadow: 0 4px 4px ${COLOR.Black}24;
	@media (min-width: 768px) {
		display: none;
	}
`;

var Close = styled.button`
	all: unset;
	width: 30px;
	height: 30px;
	font-size: 20px;
	cursor: pointer;
	color: ${COLOR.Primary};
	display: flex;
	align-items: center;
	justify-content: center;
`;

export default function ({ links = [] }) {
	const [show, setShow] = useState(false);
	return (
		<Wrap>
			<BFlex
				xs={{
					alignItems: "center",
					flexWrap: "wrap",
					gap: GAP.Small_2,
				}}
				onClick={() => setShow(!show)}
			>
				<Account />
				<Label>Compte</Label>
			</BFlex>
			{show && (
				<Flex
					xs={{
						flexDirection: "column",
						background: COLOR.Light,
						position: "fixed",
						inset: "0",
						padding: 10,
						zIndex: 10,
					}}
					md={{
						boxShadow: `0 4px 4px ${COLOR.Black}50`,
						borderRadius: RADIUS.Large_2,
						transform: "translateX(-50%)",
						position: "absolute",
						inset: "unset",
						top: "110%",
						left: "50%",
						padding: 4,
						width: 160,
					}}
				>
					<Block>
						<Title xs={{ fontSize: SIZE.Base, color: COLOR.Primary }}>Menu</Title>
						<Close onClick={() => setShow(!show)}>
							<Times color={COLOR.Primary} size={"20px"} />
						</Close>
					</Block>

					{links.map(({ to, text, ...prop }, i) => (
						<NavLink to={to} key={i} onClick={() => setShow(!show)} {...prop}>
							{text}
						</NavLink>
					))}
				</Flex>
			)}
		</Wrap>
	);
}
