import React, { useState, useEffect } from "react";
import { TaskCard, TaskSkeleton } from "../../../../components";
import { httpService, useTaskStore, useCoinStore } from "../../../../services";
import resultContainer from "../../../../assets/images/resultContainer.png";
import userDashboardBackground from "../../../../assets/images/userDashboardBackground.png";
import taskContainer from "../../../../assets/images/taskContainer.png";

const Tasks = () => {
	const [doneResult, setDoneResult] = useState([]);
	const [isLoadingDoneTask, setIsLoadingDoneTask] = useState(true);
	const [isLoadingUnDoneTask, setIsLoadingUnDoneTask] = useState(true);
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
		// GET DONE TASKS
		setIsLoadingDoneTask(true);
		getDoneTask();
		// GET UNDONE TASKS
		setIsLoadingUnDoneTask(true);
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
			})
			.finally(() => {
				setIsLoadingUnDoneTask(false);
			});
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
			})
			.finally(() => {
				setIsLoadingDoneTask(false);
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
							{isLoadingDoneTask ? (
								<div className="absolute inset-0 flex flex-col gap-4 pb-2 pt-5 mt-10 items-center z-50 mb-0.5 max-h-[550px] overflow-y-scroll no-scrollbar rounded-[60px]">
									<TaskSkeleton />
								</div>
							) : (
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
							)}
							{doneResult.length == 0 && !isLoadingDoneTask && (
								<div className=" absolute top-1/2 ml-26 mb-14 pb-5 text-center z-50 ">
									<span className="text-4xl font-MorabbaBold text-transparent bg-clip-text bg-gradient-to-r from-[#013cff] to-[#01ddff] animate-pulse duration-1000 ease-in-out transition-all transform-gpu scale-150 hover:scale-125">
										دیتایی یافت نشد
									</span>
								</div>
							)}
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
							{isLoadingUnDoneTask || isLoadingDoneTask ? (
								<div className="absolute inset-0 flex flex-col gap-4 pb-2 pt-5 mt-10 items-center z-50 mb-0.5 max-h-[550px] overflow-y-scroll no-scrollbar rounded-[60px]">
									<TaskSkeleton />
								</div>
							) : (
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
							)}
							{todoResult.length == 0 && !isLoadingUnDoneTask && (
								<div className=" absolute top-1/2 ml-26 mb-14 pb-5 text-center z-50 ">
									<span className="text-4xl font-MorabbaBold text-transparent bg-clip-text bg-gradient-to-r from-[#013cff] to-[#01ddff] animate-pulse duration-1000 ease-in-out transition-all transform-gpu scale-150 hover:scale-125">
										دیتایی یافت نشد
									</span>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Tasks;
