import React from "react";
import PropTypes from "prop-types";
import taskCardBackground from "../../../assets/images/taskCardBackground.png";
import coinLogo from "../../../assets/images/coinLogo.png";

const TaskCard = ({ item, isDoneTask, onCardClick }) => {
	const calculateCoin = () => {
		if (isDoneTask) return;
		onCardClick(item);
	};

	return (
		<>
			<button onClick={calculateCoin}>
				<div className="flex relative flex-col">
					<div
						className="absolute z-10 text-white font-MorabbaMedium top-4 right-5 text-right flex flex-col gap-1"
						dir="rtl"
					>
						{/* Title And Image */}
						<div className="flex flex-row gap-2">
							<img
								src={item.image_base64 || item.task_image_base64}
								alt="DataImage"
								style={{ width: 35, height: 35 }}
							/>
							<p className="text-lg font-MorabbaBold">{item.task_topic}</p>
						</div>
						{/* Description */}
						<div className="mr-11 pl-5 text-[15px]">
							{item.task_description}
						</div>
					</div>
					{/* Coins */}
					<div className="hover:scale-105 transition duration-200 ease-in-out transform">
						<div className=" absolute inset-0">
							<div className="flex flex-row items-center absolute inset-0 mt-32 ml-5">
								<span className="text-[#FFEA00] font-MorabbaMedium text-sm whitespace-nowrap ml-1">
									پاندا کوین
								</span>
								<span className="text-[#FFEA00] font-MorabbaMedium text-sm whitespace-nowrap ml-1">
									{Math.ceil(item.amount).toLocaleString("fa")}
								</span>
								<div className="mr-2">
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
					<img
						src={taskCardBackground}
						alt="taskCardBackground"
						style={{ width: 400, height: 160 }}
					/>
				</div>
			</button>
		</>
	);
};

TaskCard.propTypes = {
	item: PropTypes.object.isRequired,
	isDoneTask: PropTypes.bool.isRequired,
	width: PropTypes.number,
	height: PropTypes.number,
	onCardClick: PropTypes.func.isRequired,
};

export default TaskCard;
