import React from "react";
import { useState } from "react";
import { Navbar, LeaderBoardTable } from "../../components";
import { useAuthStore } from "../../services";
import leaderBoardButton from "../../assets/images/leaderBoardButton.png";
import leaderBoardButtonBorder from "../../assets/images/leaderBoardButtonBorder.png";
import volumeIcon from "../../assets/images/volumeIcon.png";
import coinIcon from "../../assets/images/coinIcon.png";

const LeaderBoard = () => {
	const { isAuthenticated } = useAuthStore();
	const [isWeekly, setIsWeekly] = useState(false);
	const [isMonthly, setIsMonthly] = useState(false);
	const [isSelected, setIsSelected] = useState(true);

	const handleWeeklyClick = () => {
		setIsSelected(true);
		setIsWeekly(true);
		setIsMonthly(false);
	};

	const handleMonthlyClick = () => {
		setIsSelected(true);
		setIsWeekly(false);
		setIsMonthly(true);
	};

	const handleAllClick = () => {
		setIsSelected(true);
		setIsWeekly(false);
		setIsMonthly(false);
	};

	const sampleTestData = [
		{
			avatarNumber: 1,
			name: "نام کاربری",
			coinAmount: 32596587,
		},
		{
			avatarNumber: 2,
			name: "نام کاربری",
			coinAmount: 32596587,
		},
		{
			avatarNumber: 3,
			name: "نام کاربری",
			coinAmount: 32596587,
		},
		{
			avatarNumber: 4,
			name: "نام کاربری",
			coinAmount: 32596587,
		},
		{
			avatarNumber: 5,
			name: "نام کاربری",
			coinAmount: 32596587,
		},
		{
			avatarNumber: 6,
			name: "نام کاربری",
			coinAmount: 32596587,
		},
	];

	return (
		<>
			{/* Navbar */}
			<div className=" mt-0 h-2">
				<Navbar isLandingPage={false} isAuthenticated={isAuthenticated} />
			</div>

			<div className="flex flex-col justify-center items-center mt-28">
				{/* Header */}
				<div className="text-white font-Lalezar text-4xl">جدول امتیازات</div>
				{/* Buttons */}
				<div className="flex flex-row justify-center items-center mt-5">
					<button onClick={handleAllClick}>
						<div className="relative">
							<div
								className="absolute z-10 text-white font-Lalezar text-lg whitespace-nowrap"
								style={{
									top: "50%",
									left: "50%",
									transform: "translate(-50%, -50%)",
								}}
							>
								همه موارد
							</div>
							{isSelected && !isWeekly && !isMonthly && (
								<div className="absolute z-10">
									<img
										src={leaderBoardButtonBorder}
										alt="leaderBoardButtonBorder"
									/>
								</div>
							)}
							<img src={leaderBoardButton} alt="allButton" />
						</div>
					</button>

					<button onClick={handleMonthlyClick} className="ml-3">
						<div className="relative">
							<div
								className="absolute z-10 text-white font-Lalezar text-lg"
								style={{
									top: "50%",
									left: "50%",
									transform: "translate(-50%, -50%)",
								}}
							>
								ماهانه
							</div>
							{isSelected && isMonthly && (
								<div className="absolute z-10">
									<img
										src={leaderBoardButtonBorder}
										alt="leaderBoardButtonBorder"
									/>
								</div>
							)}
							<img src={leaderBoardButton} alt="monthlyButton" />
						</div>
					</button>

					<button onClick={handleWeeklyClick} className="ml-3">
						<div className="relative">
							<div
								className="absolute z-10 text-white font-Lalezar text-lg"
								style={{
									top: "50%",
									left: "50%",
									transform: "translate(-50%, -50%)",
								}}
							>
								هفتگی
							</div>
							{isSelected && isWeekly && (
								<div className="absolute z-10">
									<img
										src={leaderBoardButtonBorder}
										alt="leaderBoardButtonBorder"
									/>
								</div>
							)}
							<img src={leaderBoardButton} alt="weeklyButton" />
						</div>
					</button>
				</div>
				<div className="mt-16 flex flex-row gap-16">
					<LeaderBoardTable
						title="امتیاز عملکرد"
						titleImg={coinIcon}
						usersData={sampleTestData}
					/>
					<LeaderBoardTable
						title="میزان مشارکت"
						titleImg={volumeIcon}
						usersData={sampleTestData}
					/>
				</div>
			</div>
		</>
	);
};

export default LeaderBoard;
