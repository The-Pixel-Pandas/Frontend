import React from "react";
import PropTypes from "prop-types";
import Tilt from "react-parallax-tilt";
import coinLogo from "../../../assets/images/coinLogo.png";
import questionBox from "../../../assets/images/questionBox.png";
import { useNavigate } from "react-router-dom";

const CardItem = ({ item, width = 300, height = 160, isExchange = true }) => {
	const navigate = useNavigate();
	return (
		<>
			<Tilt tiltMaxAngleX={18} tiltMaxAngleY={18}>
				<div style={{ width, height }} className="mt-7">
					<button
						onClick={() =>
							navigate(`${item.news_id || item.question_id}`, {
								relative: "path",
							})
						}
					>
						<div className="flex relative flex-col">
							<div
								className="absolute z-10 text-white font-MorabbaMedium top-4 right-5 text-right flex flex-col gap-1"
								dir="rtl"
								style={{ width: `calc(${width}px - 40px)` }}
							>
								{/* Title And Image */}
								<div className="flex flex-row gap-2">
									<img
										src={item.image_base64}
										alt="DataImage"
										style={{ width: 35, height: 35 }}
									/>

									<p className="text-[16px] font-MorabbaBold">
										{item.question_topic || item.news_topic}
									</p>
								</div>
								{/* Description */}
								<div
									className={`text-sm pt-3 pb-3 ${isExchange ? "max-h-[85px]" : "max-h-[110px]"} break-words whitespace-normal overflow-hidden w-full`}
								>
									{item.question_description || item.news_description}
								</div>
							</div>
							{/* Coins */}
							{isExchange && (
								<div className="absolute bottom-0 right-0 flex items-center flex-row">
									<div className="absolute right-10 flex flex-row gap-1 ">
										<span className="text-white font-MorabbaMedium text-[13px] whitespace-nowrap">
											حجم پاندا کوین
										</span>
										<span className="text-white font-MorabbaMedium text-[13px] whitespace-nowrap">
											{Math.ceil(item.question_volume).toLocaleString("fa")}
										</span>
									</div>
									<div>
										<img
											src={coinLogo}
											alt="coinLogo"
											style={{ width: 47, height: 40 }}
										/>
									</div>
								</div>
							)}
							{/* BackGround Image */}
							<img
								src={questionBox}
								alt="questionBox"
								style={{ width: 300, height: 205 }}
							/>
						</div>
					</button>
				</div>
			</Tilt>
		</>
	);
};

CardItem.propTypes = {
	item: PropTypes.object.isRequired,
	width: PropTypes.number,
	height: PropTypes.number,
	isExchange: PropTypes.bool,
};

export default CardItem;
