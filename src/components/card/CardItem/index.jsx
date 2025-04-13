import React from "react";
import PropTypes from "prop-types";
import coinLogo from "../../../assets/images/coinLogo.png";
import questionBox from "../../../assets/images/questionBox.png";
import { useNavigate } from "react-router-dom";

const CardItem = ({ item, width = 300, height = 160 }) => {
	const navigate = useNavigate();
	return (
		<>
			<div style={{ width, height }} className="mt-7">
				<button onClick={() => navigate(`${item.id}`, { relative: "path" })}>
					<div className="flex relative flex-col">
						<div
							className="absolute z-10 text-white font-MorabbaMedium top-4 right-5 text-right flex flex-col gap-1"
							dir="rtl"
						>
							{/* Title And Image */}
							<div className="flex flex-row gap-2">
								<img
									src={item.image}
									alt="DataImage"
									style={{ width: 35, height: 35 }}
								/>

								<p className="text-lg font-MorabbaBold">{item.title}</p>
							</div>
							{/* Description */}
							<p className="mr-11 pl-5">{item.description}</p>
						</div>
						{/* Coins */}
						<div className="absolute bottom-0 right-0 flex items-center flex-row">
							<div className="absolute right-10 flex flex-row gap-1 ">
								<span className="text-white font-MorabbaMedium text-sm whitespace-nowrap">
									پاندا کوین
								</span>
								<span className="text-white font-MorabbaMedium text-sm whitespace-nowrap">
									{item.coin.toLocaleString("fa")}
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
						{/* BackGround Image */}
						<img src={questionBox} alt="questionBox" />
					</div>
				</button>
			</div>
		</>
	);
};

CardItem.propTypes = {
	item: PropTypes.object.isRequired,
	width: PropTypes.number,
	height: PropTypes.number,
};

export default CardItem;
