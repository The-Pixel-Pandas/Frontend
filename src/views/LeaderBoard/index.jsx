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

	const [isWeekly, setIsWeekly] = useState(false);
	const [isMonthly, setIsMonthly] = useState(false);
	const [isSelected, setIsSelected] = useState(true);

	const handleWeeklyClick = () => {
		setIsSelected(true);
		setIsWeekly(true);
		setIsMonthly(false);

		httpService
			.get("https://mocki.io/v1/835f62da-6edb-41f7-8959-053447898474")
			.then((res) => setVolumeData(res.current_node.data))
			.catch((err) => console.log(err));

		httpService
			.get("https://mocki.io/v1/835f62da-6edb-41f7-8959-053447898474")
			.then((res) => setProfitData(res.current_node.data))
			.catch((err) => console.log(err));
	};

	const handleMonthlyClick = () => {
		setIsSelected(true);
		setIsWeekly(false);
		setIsMonthly(true);

		httpService
			.get("https://mocki.io/v1/7546ffa3-5e10-4009-9a8a-7e45f32d1e75")
			.then((res) => setVolumeData(res.current_node.data))
			.catch((err) => console.log(err));

		httpService
			.get("https://mocki.io/v1/7546ffa3-5e10-4009-9a8a-7e45f32d1e75")
			.then((res) => setProfitData(res.current_node.data))
			.catch((err) => console.log(err));
	};

	const handleAllClick = () => {
		setIsSelected(true);
		setIsWeekly(false);
		setIsMonthly(false);

		httpService
			.get("https://mocki.io/v1/f70a3024-f95a-4b36-a53d-a14600d62daf")
			.then((res) => setVolumeData(res.current_node.data))
			.catch((err) => console.log(err));

		httpService
			.get("https://mocki.io/v1/f70a3024-f95a-4b36-a53d-a14600d62daf")
			.then((res) => setProfitData(res.current_node.data))
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		handleAllClick();
	}, []);

	return (
		<div className="flex flex-col justify-center items-center mt-10">
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
