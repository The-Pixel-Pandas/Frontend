import React from "react";
import PropTypes from "prop-types";
import exchangeBoxContainer from "../../../assets/images/exchangeBoxContainer.png";

const ExchangeBox = ({yesPercentage, noPercentage}) => {
	return (
		<>
			<div className="flex justify-center items-center flex-col">
				<div className="relative">
					<img src={exchangeBoxContainer} alt="exchangeBoxContainer" />
				</div>
			</div>
		</>
	);
};

ExchangeBox.propTypes = {
    yesPercentage: PropTypes.number,
    noPercentage: PropTypes.number
};

export default ExchangeBox;
