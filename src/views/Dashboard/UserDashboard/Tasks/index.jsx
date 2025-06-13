import React, { useState, useEffect } from "react";
import { TaskCard } from "../../../../components";
import { httpService, useTaskStore, useCoinStore } from "../../../../services";
import resultContainer from "../../../../assets/images/resultContainer.png";
import userDashboardBackground from "../../../../assets/images/userDashboardBackground.png";
import taskContainer from "../../../../assets/images/taskContainer.png";

const Tasks = () => {
	const [doneResult, setDoneResult] = useState([]);
	const [todoResult, setTodoResult] = useState([]);
	const { removedCardIds, addRemovedCard } = useTaskStore();
	const { setCoin } = useCoinStore();

	const handleCardClick = (card) => {
		const openInNewTab = (url) => {
			const newWindow = window.open(url, "_blank", "noopener,noreferrer");
			if (newWindow) newWindow.opener = null;
		};
		openInNewTab(card.task_tag);

		setTimeout(() => {
			const data = {
				task_id: card.task_id,
			};
			httpService
				.post("tasks/complete_task/", data)
				.then((response) => {
					console.log("Tasks complete_task API response:", response);
					setTodoResult((prev) =>
						prev.filter((item) => item.task_id !== card.task_id)
					);
					setCoin(response.new_balance);
					addRemovedCard(card.task_id);
				})
				.catch((err) => {
					console.log("Tasks complete_task API error:", err);
				})
				.finally(() => {
					getDoneTask();
				});
		}, 1000);
	};

	useEffect(() => {
		// GET UNDONE TASKS
		httpService
			.get("tasks/")
			.then((response) => {
				const filteredResults = response.results.filter(
					(item) => !removedCardIds.includes(item.task_id)
				);
				setTodoResult(filteredResults);
				console.log("Tasks get API response:", filteredResults);
			})
			.catch((err) => {
				console.log("Tasks get API error:", err);
			});
		// GET DONE TASKS
		getDoneTask();
	}, []);

	useEffect(() => {
		const doneResultIds = doneResult.map((item) => item.task);
		setTodoResult((prev) =>
			prev.filter((item) => !doneResultIds.includes(item.task_id))
		);
	}, [doneResult]);

	const getDoneTask = () => {
		httpService
			.get("transaction-history/")
			.then((response) => {
				const filteredResults = response.results.filter(
					(item) => item.transaction_type === "TASK_REWARD"
				);
				setDoneResult(filteredResults);
				console.log("Tasks get API response:", filteredResults);
			})
			.catch((err) => {
				console.log("Tasks get API error:", err);
			});
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
							<img
								src={taskContainer}
								alt="taskContainer"
								style={{
									width: 430,
									height: 510,
								}}
								className="absolute bottom-0 left-1/2 transform -translate-x-1/2 transition-opacity duration-500"
							/>

							<div className=" absolute inset-0 mt-5 pb-5 text-2xl font-MorabbaBold text-center text-white">
								تسک های انجام شده
							</div>
							<div className="absolute inset-0 flex flex-col gap-4 pb-2 pt-5 mt-16 items-center z-50 mb-0.5 max-h-[550px] overflow-y-scroll no-scrollbar rounded-[60px]">
								{doneResult.map((item, index) => (
									<TaskCard
										key={index}
										item={item}
										isDoneTask={true}
										onCardClick={() => {}}
									/>
								))}
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
							<img
								src={taskContainer}
								alt="taskContainer"
								style={{
									width: 430,
									height: 510,
								}}
								className="absolute bottom-0 left-1/2 transform -translate-x-1/2 transition-opacity duration-500"
							/>
							<div className=" absolute inset-0 mt-5 pb-5 text-2xl font-MorabbaBold text-center text-white">
								تسک های فعلی
							</div>
							<div className="absolute inset-0 flex flex-col gap-4 pb-2 pt-5 mt-16 items-center z-50 mb-0.5 max-h-[550px] overflow-y-scroll no-scrollbar rounded-[60px]">
								{todoResult.map((item, index) => (
									<TaskCard
										key={index}
										item={item}
										isDoneTask={false}
										onCardClick={() => handleCardClick(item)}
									/>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Tasks;
