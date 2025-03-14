import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import propTypes from "prop-types";

const PopupComponent = ({
	triggerButton,
	component: Component,
	width = "auto",
	height = "auto",
}) => {
	return (
		<>
			<Popup trigger={triggerButton}>
				<Component width={width} height={height} />
			</Popup>
		</>
	);
};

PopupComponent.propTypes = {
	triggerButton: propTypes.element.isRequired,
	component: propTypes.elementType.isRequired,
	width: propTypes.oneOfType([propTypes.number, propTypes.string]),
	height: propTypes.oneOfType([propTypes.number, propTypes.string]),
};

export default PopupComponent;
