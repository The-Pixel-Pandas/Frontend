import React, { useState, useEffect } from "react";
import { ForecastCard } from "../../../../components";
import { httpService, useForecastStore } from "../../../../services";
import resultContainer from "../../../../assets/images/resultContainer.png";
import userDashboardBackground from "../../../../assets/images/userDashboardBackground.png";
import { AnimatePresence, motion } from "framer-motion";

const ForecastResults = () => {
	const [trueResult, setTrueResult] = useState([]);
	const [falseResult, setFalseResult] = useState([]);
	const [, setAllResult] = useState([]);
	const { removedCardIds } = useForecastStore();

	useEffect(() => {
		httpService
			.get("transaction-history/")
			.then((response) => {
				setAllResult(
					response.results.filter(
						(item) =>
							item.transaction_type === "WIN" ||
							item.transaction_type === "LOSS"
					)
				);
				setTrueResult(
					response.results.filter((item) => item.transaction_type === "WIN")
				);
				setFalseResult(
					response.results.filter((item) => item.transaction_type === "LOSS")
				);
				console.log("Forecast get API response:", response);
				console.log(trueResult);
				console.log(falseResult);
			})
			.catch((err) => {
				console.log("Forecast get API error:", err);
			});
	}, [removedCardIds]);

	return (
		<>
			<div className="absolute left-0 top-0 flex items-center z-0 ml-14 mt-10">
				<div className="relative">
					{/* BackGround Image */}
					<img
						src={userDashboardBackground}
						alt="dashboardContainer"
						style={{ width: 1100, height: 600 }}
					/>
					<div className="absolute inset-0 z-10 flex items-center justify-center mr-[530px]">
						<div className="relative">
							<img
								src={resultContainer}
								alt="resultContainer"
								style={{ width: 450, height: 570 }}
							/>
							<div className=" absolute inset-0 mt-5 pb-5 text-2xl font-MorabbaBold text-center text-white">
								پیشبینی های اشتباه
							</div>
							<motion.div
								className=" absolute inset-0 flex flex-col gap-5 pb-2 pt-2 mt-16 items-center z-50 max-h-[570px] overflow-y-scroll no-scrollbar"
								layout
							>
								<AnimatePresence mode="popLayout">
									{falseResult.map((item, index) => (
										<ForecastCard
											key={item.transaction_id || index}
											item={item}
											isTrueForecast={item.transaction_type === "WIN"}
											isAllResult={true}
											onCardClick={() => {}}
										/>
									))}
								</AnimatePresence>
							</motion.div>
						</div>
					</div>
					<div className="absolute inset-0 z-10 flex items-center justify-center ml-[530px] ">
						<div className="relative">
							<img
								src={resultContainer}
								alt="resultContainer"
								style={{ width: 450, height: 570 }}
							/>
							<div className=" absolute inset-0 mt-5 pb-5 text-2xl font-MorabbaBold text-center text-white">
								پیشبینی های صحیح
							</div>
							<motion.div
								className=" absolute inset-0 flex flex-col gap-5 pb-2 pt-2 mt-16 items-center z-50 max-h-[570px] overflow-y-scroll no-scrollbar"
								layout
							>
								<AnimatePresence mode="popLayout">
									{trueResult.map((item, index) => (
										<ForecastCard
											key={item.transaction_id || index}
											item={item}
											isTrueForecast={true}
											isAllResult={true}
											onCardClick={() => {}}
										/>
									))}
								</AnimatePresence>
							</motion.div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ForecastResults;
