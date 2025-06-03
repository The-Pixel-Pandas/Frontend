import React from "react";
import PropTypes from "prop-types";
import userSubmitCoinLogo from "../../../assets/images/userSubmitCoinLogo.png";
import shinyCoinLogo from "../../../assets/images/shinyCoinLogo.png";

const AnimateCoinLogo = ({ width = 225, height = 175, isShiny = false }) => {
	return (
		<>
			<img
				src={isShiny ? shinyCoinLogo : userSubmitCoinLogo}
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
	isShiny: PropTypes.bool,
};

export default AnimateCoinLogo;
