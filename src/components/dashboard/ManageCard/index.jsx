import React from "react";
import PropTypes from "prop-types";
import manageCardContainer from "../../../assets/images/manageCardContainer.png";
import manageCardContainer2 from "../../../assets/images/manageCardContainer2.png";
import manageCoinLogo from "../../../assets/images/manageCoinLogo.png";
import manageCardCategory from "../../../assets/images/manageCardCategory.png";

const ManageCard = ({
	title,
	description,
	coin,
	categories,
	image,
	isAnotherColor = false,
}) => {
	return (
		<>
			<div>
				<div className="relative ">
					{/* BackGround Image */}
					<img
						src={isAnotherColor ? manageCardContainer2 : manageCardContainer}
						alt="manageCardContainer"
						style={{ width: 740, height: 276 }}
					/>

					<div className="absolute inset-0 z-50 mt-11 ">
						{/* Image */}
						<div className="flex flex-row gap-1  mr-5 " dir="rtl">
							<img
								src={image}
								alt="manageCardImage"
								style={{ width: 75, height: 75 }}
							/>

							{/* Title And Description */}
							<div className="flex flex-col gap-5 mr-5 ml-5" dir="rtl">
								<div className="text-[22px] font-MorabbaBold text-white">
									{title}
								</div>
								<div className="text-[19px] font-MorabbaMedium text-white text-wrap ">
									{description}
								</div>
							</div>
						</div>

						<div className="flex ">
							{/* Coin */}
							<div className="flex flex-row items-center absolute right-0 bottom-0 mr-5 mb-2.5 ">
								<div className="absolute right-0 mr-14">
									<div className="text-[14px] font-MorabbaBold text-white whitespace-nowrap ">
										<div className="flex flex-row gap-1 items-center">
											<div>حجم پاندا کوین</div>
											<div>{coin.toLocaleString("fa")}</div>
										</div>
									</div>
								</div>
								<img
									src={manageCoinLogo}
									alt="coinLogo"
									style={{ width: 70, height: 60 }}
								/>
							</div>
							{/* Categories */}
							<div className="flex flex-row gap-2 items-center absolute bottom-5 left-10 ">
								{categories.map((category, index) => (
									<div key={index} className="relative">
										<img
											src={manageCardCategory}
											alt="manageCardCategory"
											className="w-24 h-8"
										/>
										<div className="absolute inset-0 flex items-center justify-center text-white text-[14px] font-MorabbaRegular whitespace-nowrap">
											{category}
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

ManageCard.propTypes = {
	image: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	coin: PropTypes.number.isRequired,
	categories: PropTypes.array.isRequired,
	isAnotherColor: PropTypes.bool,
};

export default ManageCard;
