import React, { useState, useEffect } from "react";
import { ForecastCard } from "../../../../components";
import { httpService } from "../../../../services";
import resultContainer from "../../../../assets/images/resultContainer.png";
import userDashboardBackground from "../../../../assets/images/userDashboardBackground.png";

const ForecastResults = () => {
	const [trueResult, setTrueResult] = useState([]);
	const [falseResult, setFalseResult] = useState([]);

	useEffect(() => {
		httpService
			.get("https://mocki.io/v1/b9c0a94a-e4ae-4529-8b49-8e7472cd1968")
			.then((response) => {
				setTrueResult(response.current_node.data);
				setFalseResult(response.current_node.data);
				console.log("Forecast get API response:", err);
			})
			.catch((err) => {
				console.log("Forecast get API error:", err);
			});
	}, []);

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
								پیش بینی های اشتباه
							</div>
							<div className=" absolute inset-0 flex flex-col gap-5 pb-2 pt-2  mt-16  items-center z-50 max-h-[570px] overflow-y-scroll no-scrollbar ">
								{trueResult.map((item, index) => (
									<ForecastCard key={index} item={item} />
								))}
							</div>
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
								پیش بینی های صحیح
							</div>
							<div className=" absolute inset-0 flex flex-col gap-5 pb-2 pt-2  mt-16  items-center z-50 max-h-[570px] overflow-y-scroll no-scrollbar ">
								{falseResult.map((item, index) => (
									<ForecastCard key={index} item={item} />
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ForecastResults;
