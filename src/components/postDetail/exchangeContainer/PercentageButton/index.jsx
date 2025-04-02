import React from "react";
import PropTypes from "prop-types";
import percentageButton from "../../../../assets/images/percentageButton.png";

const PercentageButton = ({ percentage, text }) => {
	return (
		<>
			<div className="relative">
				<div className="absolute inset-0 flex items-center justify-center">
					<div className="relative">
						<div className="absolute inset-0 left-5 items-center flex">
							<span className="text-white font-MorabbaMedium text-lg">{`${percentage.toLocaleString("fa")}%`}</span>
							<span className="text-white font-Lalezar text-2xl ml-20 mb-1">
								{text}
							</span>
						</div>

						<img
							src={percentageButton}
							alt="percentageButton"
							style={{ width: 225, height: 47 }}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

PercentageButton.propTypes = {
	percentage: PropTypes.number,
	text: PropTypes.string,
};

export default PercentageButton;
