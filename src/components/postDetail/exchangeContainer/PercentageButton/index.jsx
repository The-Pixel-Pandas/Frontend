import React from "react";
import PropTypes from "prop-types";
import percentageButton from "../../../../assets/images/percentageButton.png";
import percentageContainer from "../../../../assets/images/percentageContainer.png";

const PercentageButton = ({
	percentage,
	text,
	isRight,
	onTogglePosition,
	id,
}) => {
	const togglePosition = () => {
		onTogglePosition(id);
	};

	return (
		<>
			<div className="relative">
				<div className="absolute inset-0 flex items-center justify-center">
					<div className="relative">
						{/* Yes/No Button */}
						<div
							className={`absolute inset-0 ${isRight ? "right-0" : "left-16"} ml-12 top-1 flex items-center justify-center z-20 w-full h-full`}
							style={{
								transition: "all 0.5s ease",
								transform: isRight ? "translateX(0)" : "translateX(-160px)",
							}}
						>
							<button
								className="bg-transparent border-none"
								onClick={togglePosition}
							>
								<div className="relative">
									<img
										src={percentageButton}
										alt="percentageButton"
										style={{ width: 160, height: 50 }}
									/>
									<div className="absolute inset-0 flex items-center justify-center">
										<span className="text-white font-Lalezar text-2xl">
											{text}
										</span>
									</div>
								</div>
							</button>
						</div>
						{/* Percentages */}
						<div className="relative">
							<div className="absolute inset-0 left-7 items-center flex">
								<span className="text-white font-MorabbaBold text-lg">{`${percentage.toLocaleString("fa")}%`}</span>
							</div>
							<img
								src={percentageContainer}
								alt="percentageContainer"
								style={{ width: 250, height: 40 }}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

PercentageButton.propTypes = {
	percentage: PropTypes.number,
	text: PropTypes.string,
	isRight: PropTypes.bool.isRequired,
	onTogglePosition: PropTypes.func.isRequired,
	id: PropTypes.string.isRequired,
};

export default PercentageButton;
