import React, { useState, useEffect } from "react";
import { LeaderBoardTable } from "../../components";
import leaderBoardButton from "../../assets/images/leaderBoardButton.png";
import leaderBoardButtonBorder from "../../assets/images/leaderBoardButtonBorder.png";
import volumeIcon from "../../assets/images/volumeIcon.png";
import coinIcon from "../../assets/images/coinIcon.png";
import { httpService } from "../../services";

const LeaderBoard = () => {
	const [volumeData, setVolumeData] = useState([]);
	const [profitData, setProfitData] = useState([]);
	const [selectedFilter, setSelectedFilter] = useState("all_time");

	const fetchLeaderboardData = async () => {
		try {
			const res = await httpService.get("wallet-leaderboards/");
			setVolumeData(res[selectedFilter].volume);
			setProfitData(res[selectedFilter].profit);
			console.log("LeaderBoard Get API:", res);
		} catch (err) {
			console.error("LeaderBoard Get API Error:", err);
		}
	};

	useEffect(() => {
		fetchLeaderboardData();
	}, [selectedFilter]);

	const handleFilterChange = (filter) => {
		setSelectedFilter(filter);
	};

	return (
		<div className="flex flex-col justify-center items-center mt-10">
			{/* Header */}
			<div className="text-white font-Lalezar text-4xl">جدول امتیازات</div>

			{/* Buttons */}
			<div className="flex flex-row justify-center items-center mt-5">
				<button onClick={() => handleFilterChange("all_time")}>
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
						{selectedFilter === "all_time" && (
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

				<button onClick={() => handleFilterChange("monthly")} className="ml-3">
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
						{selectedFilter === "monthly" && (
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

				<button onClick={() => handleFilterChange("weekly")} className="ml-3">
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
						{selectedFilter === "weekly" && (
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

			{/* Tables */}
			<div className="mt-16 flex flex-row gap-16">
				<LeaderBoardTable
					title="امتیاز عملکرد"
					titleImg={coinIcon}
					usersData={profitData}
				/>
				<LeaderBoardTable
					title="میزان مشارکت"
					titleImg={volumeIcon}
					usersData={volumeData}
				/>
			</div>
		</div>
	);
};

export default LeaderBoard;
