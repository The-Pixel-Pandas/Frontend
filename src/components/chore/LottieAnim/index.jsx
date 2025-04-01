import React from "react";
import Lottie from "react-lottie-player";
import PropTypes from "prop-types";

const LottieAnim = ({ width, height, lottieJson }) => {
	return (
		<>
			<Lottie
				loop
				animationData={lottieJson}
				play
				style={{ width: width, height: height }}
			/>
		</>
	);
};

LottieAnim.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number,
	lottieJson: PropTypes.object,
};

export default LottieAnim;
