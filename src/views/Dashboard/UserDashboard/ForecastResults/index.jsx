import React, { useState, useEffect } from "react";
import { ForecastCard, ForecastResultSkeleton } from "../../../../components";
import { httpService, useForecastStore } from "../../../../services";
import resultContainer from "../../../../assets/images/resultContainer.png";
import userDashboardBackground from "../../../../assets/images/userDashboardBackground.png";
import { AnimatePresence, motion } from "framer-motion";

const ForecastResults = () => {
	const [trueResult, setTrueResult] = useState([]);
	const [falseResult, setFalseResult] = useState([]);
	const [isLoadingTrueResult, setIsLoadingTrueResult] = useState(true);
	const [isLoadingFalseResult, setIsLoadingFalseResult] = useState(true);
	const [, setAllResult] = useState([]);
	const { removedCardIds } = useForecastStore();

	useEffect(() => {
		setIsLoadingFalseResult(true);
		setIsLoadingTrueResult(true);
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
			})
			.catch((err) => {
				console.log("Forecast get API error:", err);
			})
			.finally(() => {
				setIsLoadingFalseResult(false);
				setIsLoadingTrueResult(false);
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
							{isLoadingFalseResult ? (
								<div className=" absolute inset-0 flex flex-col gap-5 pb-2 pt-2 mt-10 items-center z-50 max-h-[570px] overflow-y-scroll no-scrollbar">
									<ForecastResultSkeleton />
								</div>
							) : (
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
							)}

							{falseResult.length == 0 && !isLoadingFalseResult && (
								<div className=" absolute top-1/2 ml-26 mb-14 pb-5 text-center z-50 ">
									<span className="text-4xl font-MorabbaBold text-transparent bg-clip-text bg-gradient-to-r from-[#013cff] to-[#01ddff] animate-pulse duration-1000 ease-in-out transition-all transform-gpu scale-150 hover:scale-125">
										دیتایی یافت نشد
									</span>
								</div>
							)}
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
							{isLoadingTrueResult ? (
								<div className=" absolute inset-0 flex flex-col gap-5 pb-2 pt-2 mt-10 items-center z-50 max-h-[570px] overflow-y-scroll no-scrollbar">
									<ForecastResultSkeleton />
								</div>
							) : (
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
							)}
							{trueResult.length == 0 && !isLoadingTrueResult && (
								<div className=" absolute top-1/2 ml-26 mb-14 pb-5 text-center z-50 ">
									<span className="text-4xl font-MorabbaBold text-transparent bg-clip-text bg-gradient-to-r from-[#013cff] to-[#01ddff] animate-pulse duration-1000 ease-in-out transition-all transform-gpu scale-150 hover:scale-125">
										دیتایی یافت نشد
									</span>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ForecastResults;
