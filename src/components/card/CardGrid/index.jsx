import React from "react";
import CardItem from "../CardItem";
import PropTypes from "prop-types";

const CardGrid = ({ items, isExchange = true }) => {
	return (
		<div className="grid grid-cols-4 ml-24 mr-24 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
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
