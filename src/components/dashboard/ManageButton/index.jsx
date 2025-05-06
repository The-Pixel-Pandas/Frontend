import React from "react";
import PropTypes from "prop-types";

const ManageButton = ({ clickState, check, checkClicked }) => {
	return (
		<>
			<div className="relative z-50">
				<img src={check} alt="checkTrue" />
			</div>
			<div className={clickState ? "absolute inset-0" : "hidden"}>
				<img src={checkClicked} alt="checkTrueClicked" />
			</div>
		</>
	);
};

ManageButton.propTypes = {
	clickState: PropTypes.bool.isRequired,
	check: PropTypes.string.isRequired,
	checkClicked: PropTypes.string.isRequired,
};

export default ManageButton;
