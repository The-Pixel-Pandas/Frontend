import React from "react";
import PropTypes from "prop-types";
import { useAvatarStore } from "../../services";
import { Footer } from "../index";
import PublicProfileMedal from "../PublicProfileMedal";
import popupBackground from "../../assets/images/popupBackground.png";
import closeButton from "../../assets/images/closeButton.png";
import popupContainer from "../../assets/images/popupContainer.png";
import popupBox from "../../assets/images/popupBox.png";

const PublicProfilePopup = ({
	width = 450,
	height = 600,
	avatarNumber = 1,
	name = "نام کاربری",
	biography = "بیوگرافی",
	transaction = 0,
	volume = 0,
	rank = 0,
	medals = [1, 2, 3],
	onClick,
}) => {
	const { getAvatarByNumber } = useAvatarStore();

	return (
		<div className="flex justify-center items-center">
			<div className="relative" style={{ width, height }}>
				{/* BackGround */}
				<img src={popupBackground} alt="popupBackground" />
				{/* Header */}
				<div className="absolute top-0 right-0 mr-8 mt-8" dir="rtl">
					<div className="flex flex-row gap-5">
						<img
							src={getAvatarByNumber(avatarNumber)}
							alt="avatar"
							style={{ width: 70, height: 70 }}
						/>

						<div className="flex flex-col gap-0.5 relative">
							<div className=" text-white font-MorabbaBold text-2xl whitespace-nowrap">
								{name}
							</div>
							<div
								className="text-white text-xl font-MorabbaMedium overflow-hidden overflow-ellipsis whitespace-pre-wrap"
								style={{
									maxWidth: `calc(${width}px - 150px)`,
								}}
							>
								{biography}
							</div>
						</div>
					</div>
				</div>
				{/* Close Button */}
				<div className="absolute top-0 left-0 ml-3.5 mt-3">
					<button
						style={{ width: 40, height: 40 }}
						className="hover:scale-105"
						onClick={onClick}
					>
						<img src={closeButton} alt="closeButton" />
					</button>
				</div>
				{/* User Info */}
				<div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-full">
					<div className="flex flex-col gap-10 items-center">
						<div className="relative w-full flex justify-center">
							<img
								src={popupContainer}
								alt="popupContainer"
								style={{ width: width - 40 }}
								className="object-contain"
							/>
							<div
								className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[86%] flex justify-between gap-2.5"
								style={{ fontSize: "12px" }}
							>
								<div className="relative flex-1">
									<img
										src={popupBox}
										alt="popup box"
										className="w-full h-[190px] object-contain"
									/>
									<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center whitespace-nowrap">
										<p className="text-white font-MorabbaMedium mb-5 ">
											میزان معاملات
										</p>
										<p className="text-white font-MorabbaMedium mt-2">
											{transaction.toLocaleString("fa")}
										</p>
									</div>
								</div>
								<div className="relative flex-1">
									<img
										src={popupBox}
										alt="popup box"
										className="w-full h-[190px] object-contain"
									/>
									<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center whitespace-nowrap">
										<p className="text-white font-MorabbaMedium mb-5 ">
											تعداد مشارکت
										</p>
										<p className="text-white font-MorabbaMedium mt-2">
											{volume.toLocaleString("fa")}
										</p>
									</div>
								</div>
								<div className="relative flex-1">
									<img
										src={popupBox}
										alt="popup box"
										className="w-full h-[190px] object-contain"
									/>
									<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center whitespace-nowrap">
										<p className="text-white font-MorabbaMedium mb-5">
											رتبه فعلی جدول امتیازات
										</p>
										<p className="text-white font-MorabbaMedium  mt-2">
											{rank.toLocaleString("fa")}
										</p>
									</div>
								</div>
							</div>
						</div>
						{/* Medals */}
						<div className="relative w-full flex justify-center">
							<img
								src={popupContainer}
								alt="popupContainer"
								style={{ width: width - 40 }}
								className="object-contain"
							/>
							<div
								className="absolute top-0 right-0 text-nowrap text-white font-MorabbaBold mr-10 mt-1 z-10 "
								style={{ fontSize: "14px" }}
							>
								<p>مدال های کسب شده</p>
							</div>
							<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[86%]" dir="rtl">
								<div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent no-scrollbar mt-4">
									<div className="flex flex-row gap-3.5 min-w-max px-2 py-4">
										{medals.map((medal, index) => (
											<PublicProfileMedal key={index} medalNumber={medal} />
										))}
									</div>
								</div>
							</div>
						</div>
						{/* Footer */}
						<div className="ml-5">
							<Footer isPageFooter={false} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

PublicProfilePopup.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number,
	avatarNumber: PropTypes.number,
	name: PropTypes.string,
	biography: PropTypes.string,
	transaction: PropTypes.number,
	volume: PropTypes.number,
	rank: PropTypes.number,
	medals: PropTypes.array,
	onClick: PropTypes.func,
};

export default PublicProfilePopup;
