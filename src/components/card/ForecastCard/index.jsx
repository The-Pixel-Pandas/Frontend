import React from "react";
import PropTypes from "prop-types";
import sample from "../../../assets/images/DataImages/sample.png";
import forecastCardBox from "../../../assets/images/forecastCardBox.png";
import coinLogo from "../../../assets/images/coinLogo.png";
import forecastCardButton from "../../../assets/images/forecastCardButton.png";

const ForecastCard = ({ item, width = 400, height = 220 }) => {
	return (
		<>
			<div style={{ width, height }} className="">
				<div className="flex relative flex-col">
					<div
						className="absolute z-10 text-white font-MorabbaMedium top-4 right-5 text-right flex flex-col gap-1"
						dir="rtl"
					>
						{/* Title And Image */}
						<div className="flex flex-row gap-2">
							<img
								src={sample}
								alt="DataImage"
								style={{ width: 35, height: 35 }}
							/>

							<p className="text-lg font-MorabbaBold">{item.title}</p>
						</div>
						{/* Description */}
						<div className="mr-11 pl-5 text-[15px]">{item.description}</div>
					</div>
					{/* Coins */}
					<div className=" absolute bottom-3 right-10">
						<img
							src={forecastCardButton}
							alt="forecastCardButton"
							style={{ width: 340, height: 35 }}
							className="mt-0.5"
						/>
						<div className=" absolute inset-0">
							<div className="flex flex-row gap-0.5 items-center absolute right-2">
								<span className="text-white font-MorabbaMedium text-sm whitespace-nowrap">
									پاندا کوین
								</span>
								<span className="text-white font-MorabbaMedium text-sm whitespace-nowrap">
									{item.coin.toLocaleString("fa")}
								</span>
								<div>
									<img
										src={coinLogo}
										alt="coinLogo"
										style={{ width: 47, height: 40 }}
									/>
								</div>
							</div>
						</div>
					</div>
					{/* BackGround Image */}
					<img src={forecastCardBox} alt="forecastCardBox" />
				</div>
			</div>
		</>
	);
};

ForecastCard.propTypes = {
	item: PropTypes.object.isRequired,
	width: PropTypes.number,
	height: PropTypes.number,
};

export default ForecastCard;
