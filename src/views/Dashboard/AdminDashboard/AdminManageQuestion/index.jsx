import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { ManageCard, ManageButton } from "../../../../components";
import adminContainer from "../../../../assets/images/adminContainer.png";
import checkTrue from "../../../../assets/images/checkTrue.png";
import checkFalse from "../../../../assets/images/checkFalse.png";
import checkTrueClicked from "../../../../assets/images/checkTrueClicked.png";
import checkFalseClicked from "../../../../assets/images/checkFalseClicked.png";

const AdminManageQuestion = () => {
	const [isConfirm, setIsConfirm] = useState(false);
	const [isReject, setIsReject] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isCompleted, setIsCompleted] = useState(false);
	const swiperRef = useRef(null);

	const questions = [
		{
			id: 1,
			title: "گزارشات مردمی مبنای دستگیری هنجارشکنان درفردای چهارشنبه‌سوری1",
			description:
				"لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.",
			coin: 10,
			categories: ["برنامه نویسی", "برنامه نویسی", "برنامه نویسی"],
		},
		{
			id: 2,
			title: "گزارشات مردمی مبنای دستگیری هنجارشکنان درفردای چهارشنبه‌سوری2",
			description:
				"لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.",
			coin: 15,
			categories: ["طراحی", "گرافیک", "هنر"],
		},
		{
			id: 3,
			title: "گزارشات مردمی مبنای دستگیری هنجارشکنان درفردای چهارشنبه‌سوری3",
			description:
				"لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.",
			coin: 20,
			categories: ["مدیریت", "کسب و کار", "استراتژی"],
		},
		{
			id: 4,
			title: "گزارشات مردمی مبنای دستگیری هنجارشکنان درفردای چهارشنبه‌سوری4",
			description:
				"لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.",
			coin: 10,
			categories: ["برنامه نویسی", "برنامه نویسی", "برنامه نویسی"],
		},
		{
			id: 5,
			title: "گزارشات مردمی مبنای دستگیری هنجارشکنان درفردای چهارشنبه‌سوری5",
			description:
				"لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.",
			coin: 15,
			categories: ["طراحی", "گرافیک", "هنر"],
		},
		{
			id: 6,
			title: "گزارشات مردمی مبنای دستگیری هنجارشکنان درفردای چهارشنبه‌سوری6",
			description:
				"لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.",
			coin: 20,
			categories: ["مدیریت", "کسب و کار", "استراتژی"],
		},
	];

	const handleAction = (type) => {
		if (isCompleted) return;

		if (type === "confirm") {
			setIsConfirm(true);
			setIsReject(false);
		} else {
			setIsReject(true);
			setIsConfirm(false);
		}

		setTimeout(() => {
			if (currentIndex === questions.length - 1) {
				setIsCompleted(true);
				return;
			}

			if (swiperRef.current) {
				swiperRef.current.slideNext();
			}
		}, 500);
	};

	useEffect(() => {
		const timeout = setTimeout(() => {
			setIsConfirm(false);
			setIsReject(false);
		}, 1000);
		return () => clearTimeout(timeout);
	}, [isConfirm, isReject]);

	return (
		<div className="absolute left-0 top-0 flex items-center z-0 ml-14">
			<div className="relative">
				{/* BackGround Image */}
				<img
					src={adminContainer}
					alt="adminContainer"
					style={{ width: 1100, height: 600 }}
					className="mt-10"
				/>
				{/* Swiper Component */}
				<div className="absolute inset-0  flex items-center justify-center mt-12">
					<div className="w-full h-full">
						{isCompleted ? (
							<div className="flex items-center justify-center h-full">
								<div className="text-center text-2xl font-bold text-white font-MorabbaBold p-8 bg-opacity-80 bg-gray-800 rounded-xl">
									🎉 همه سوالات بررسی شدند
								</div>
							</div>
						) : (
							<Swiper
								direction="vertical"
								slidesPerView={3}
								centeredSlides={true}
								grabCursor={true}
								initialSlide={0}
								spaceBetween={70}
								loop={false}
								allowTouchMove={!isCompleted}
								onSwiper={(swiper) => (swiperRef.current = swiper)}
								onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
								className="mySwiper h-full"
							>
								{questions.map((question, index) => {
									let isActive = currentIndex === index;

									let className =
										"transition-all duration-500 flex items-center justify-center h-full ";
									className += isActive
										? " scale-100 opacity-100 z-50 "
										: " scale-90 opacity-20 z-10 ";

									return (
										<SwiperSlide key={question.id}>
											<div className={className}>
												<ManageCard
													title={question.title}
													description={question.description}
													coin={question.coin}
													categories={question.categories}
												/>
											</div>
										</SwiperSlide>
									);
								})}
							</Swiper>
						)}
					</div>
				</div>
				{/* Check Button */}
				{!isCompleted && (
					<div className="absolute inset-0 z-50 flex items-center">
						<div className="flex flex-row">
							<button
								className="absolute left-0 ml-14 hover:scale-105 transition-all duration-500"
								onClick={() => handleAction("reject")}
								style={{ width: 80, height: 80 }}
							>
								<ManageButton
									clickState={isReject}
									check={checkFalse}
									checkClicked={checkFalseClicked}
								/>
							</button>
							<button
								className="absolute right-0 mr-14 hover:scale-105 transition-all duration-500"
								onClick={() => handleAction("confirm")}
								style={{ width: 80, height: 80 }}
							>
								<ManageButton
									clickState={isConfirm}
									check={checkTrue}
									checkClicked={checkTrueClicked}
								/>
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default AdminManageQuestion;
