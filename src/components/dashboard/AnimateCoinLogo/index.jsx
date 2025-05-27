import React from "react";
import PropTypes from "prop-types";
import userSubmitCoinLogo from "../../../assets/images/userSubmitCoinLogo.png";

const AnimateCoinLogo = ({ width = 225, height = 175 }) => {
	return (
		<>
			<img
				src={userSubmitCoinLogo}
				alt="coinLogo"
				style={{
					width: width,
					height: height,
					animation: "resize 1.5s ease-in-out infinite",
				}}
				className="mr-5 mb-1"
			/>
			<style>
				{`
                                @keyframes resize {
                                    0% {
                                        transform: scale(1);
                                    }
                                    50% {
                                        transform: scale(1.1);
                                    }
                                    100% {
                                        transform: scale(1);
                                    }
                                }
                            `}
			</style>
		</>
	);
};

AnimateCoinLogo.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number,
};

export default AnimateCoinLogo;
