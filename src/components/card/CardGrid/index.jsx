import React from "react";
import CardItem from "../CardItem";
import PropTypes from "prop-types";

const CardGrid = ({ items, isExchange = true }) => {
	return (
		<div className="grid grid-cols-4 gap-x-5 gap-y-9" dir="rtl">
			{items.map((q, index) => (
				<CardItem key={index} item={q} isExchange={isExchange} />
			))}
		</div>
	);
};

CardGrid.propTypes = {
	items: PropTypes.arrayOf(PropTypes.object).isRequired,
	isExchange: PropTypes.bool,
};

export default CardGrid;
