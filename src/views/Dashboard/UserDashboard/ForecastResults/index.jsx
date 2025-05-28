import React from "react";
import { ForecastCard } from "../../../../components";
import resultContainer from "../../../../assets/images/resultContainer.png";
import userDashboardBackground from "../../../../assets/images/userDashboardBackground.png";

const ForecastResults = () => {
	const item = {
		title: "عنوان",
		description:
			"(توضیحات هر عنوان )لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.",
		image: "https://via.placeholder.com/150",
		coin: 100,
	};
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
								<ForecastCard item={item} />
								<ForecastCard item={item} />
								<ForecastCard item={item} />
								<ForecastCard item={item} />
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
								<ForecastCard item={item} />
								<ForecastCard item={item} />
								<ForecastCard item={item} />
								<ForecastCard item={item} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ForecastResults;
