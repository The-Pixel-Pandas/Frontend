import React, { useState } from "react";
import PropTypes from "prop-types";
import { useCoinStore, httpService, useProfileStore } from "../../../services";
import { motion } from "framer-motion";
import forecastCardBox from "../../../assets/images/forecastCardBox.png";
import coinLogo from "../../../assets/images/coinLogo.png";
import forecastCardButton from "../../../assets/images/forecastCardButton.png";
import arrowIcon from "../../../assets/images/arrowIcon.png";

const ForecastCard = ({
	item,
	isTrueForecast,
	onCardClick,
	isAllResult,
	width = 400,
	height = 220,
}) => {
	const { setCoin } = useCoinStore();
	const [isRemoving, setIsRemoving] = useState(false);
	const { id } = useProfileStore();

	const calculateCoin = () => {
		if (isAllResult) return;
		if (isTrueForecast) {
			const data = {
				amount: item.amount,
				user_id: id,
			};
			console.log("update-balance API data:", data);

			httpService
				.post("update-balance/", data)
				.then((res) => {
					setCoin(res.new_balance);
					console.log("update-balance API response:", res);
				})
				.catch((err) => {
					console.log("update-balance API error:", err);
				});
		}

		setIsRemoving(true);
		setTimeout(() => {
			onCardClick(item);
		}, 500);
	};

	return (
		<motion.div
			style={{ width, height }}
			initial={{ opacity: 1, x: 0 }}
			animate={{
				opacity: isRemoving ? 0 : 1,
				x: isRemoving ? -100 : 0,
				height: isRemoving ? 0 : height,
			}}
			transition={{ duration: 0.5, ease: "easeOut" }}
			layout
		>
			<div className="flex relative flex-col">
				<div
					className="absolute z-10 text-white font-MorabbaMedium top-4 right-5 text-right flex flex-col gap-1"
					dir="rtl"
				>
					{/* Title And Image */}
					<div className="flex flex-row gap-2">
						<img
							src={item.question_image_base64 || item.task_image_base64}
							alt="DataImage"
							style={{ width: 35, height: 35 }}
						/>
						<p className="text-lg font-MorabbaBold">
							{item.question_topic || item.task_topic}
						</p>
					</div>
					{/* Description */}
					<div className="mr-11 pl-5 text-[15px]">
						{item.question_description || item.task_description}
					</div>
				</div>

				{/* Coins */}
				{isTrueForecast && (
					<div className="absolute bottom-3 right-10 z-50">
						<img
							src={forecastCardButton}
							alt="forecastCardButton"
							style={{ width: 340, height: 35 }}
							className="mt-0.5"
						/>
						<div className="absolute inset-0">
							<div className="flex flex-row gap-0.5 items-center absolute right-2">
								<button
									className={`hover:scale-105 transition duration-300 ${isAllResult ? "hidden" : ""}`}
									onClick={calculateCoin}
								>
									<div className={`mr-[170px]`}>
										<img
											src={arrowIcon}
											alt="arrowIcon"
											style={{ width: 24, height: 24 }}
										/>
									</div>
								</button>
								<span className="text-white font-MorabbaMedium text-sm whitespace-nowrap">
									پاندا کوین
								</span>
								<span className="text-white font-MorabbaMedium text-sm whitespace-nowrap">
									{item.amount.toLocaleString("fa")}
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
				)}

				{/* BackGround Image */}
				<img
					src={forecastCardBox}
					alt="forecastCardBox"
					style={{ width: width, height: height }}
				/>
			</div>
		</motion.div>
	);
};

ForecastCard.propTypes = {
	item: PropTypes.object.isRequired,
	isTrueForecast: PropTypes.bool.isRequired,
	isAllResult: PropTypes.bool.isRequired,
	width: PropTypes.number,
	height: PropTypes.number,
	onCardClick: PropTypes.func.isRequired,
};

export default ForecastCard;
