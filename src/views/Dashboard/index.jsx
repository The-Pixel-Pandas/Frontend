import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import dashboardButton from "../../assets/images/dashboardButton.png";
import dashboardButtonBorder from "../../assets/images/dashboardButtonBorder.png";
import dashboardContainer from "../../assets/images/dashboardContainer.png";

const Dashboard = () => {
	const [selectedButton, setSelectedButton] = useState(0);

	const handleClick = (index) => {
		setSelectedButton(index);
	};

	return (
		<>
			<div className="relative">
				<div className="absolute right-0 top-0 flex flex-col items-end justify-end mt-16 gap-20 mr-14">
					<NavLink to="/dashboard/userProfile">
						<button onClick={() => handleClick(0)} className="outline-none">
							<div className="relative">
								<div
									className="absolute z-10 text-white font-Lalezar text-lg whitespace-nowrap"
									style={{
										top: "50%",
										left: "50%",
										transform: "translate(-50%, -50%)",
									}}
								>
									پروفایل
								</div>
								{selectedButton === 0 && (
									<div className="absolute z-10">
										<img
											src={dashboardButtonBorder}
											alt="dashboardButtonBorder"
											style={{ width: 266 }}
										/>
									</div>
								)}
								<img
									src={dashboardButton}
									alt="dashboardButton"
									className="outline-none"
									style={{ width: 266 }}
								/>
							</div>
						</button>
					</NavLink>
					<NavLink to="/dashboard/userInfo">
						<button onClick={() => handleClick(1)} className="outline-none">
							<div className="relative">
								<div
									className="absolute z-10 text-white font-Lalezar text-lg whitespace-nowrap"
									style={{
										top: "50%",
										left: "50%",
										transform: "translate(-50%, -50%)",
									}}
								>
									اطلاعات شخصی
								</div>
								{selectedButton === 1 && (
									<div className="absolute z-10">
										<img
											src={dashboardButtonBorder}
											alt="dashboardButtonBorder"
											style={{ width: 266 }}
										/>
									</div>
								)}
								<img
									src={dashboardButton}
									alt="dashboardButton"
									className="outline-none"
									style={{ width: 266 }}
								/>
							</div>
						</button>
					</NavLink>
					<NavLink to="/dashboard/wallet">
						<button onClick={() => handleClick(2)} className="outline-none">
							<div className="relative">
								<div
									className="absolute z-10 text-white font-Lalezar text-lg whitespace-nowrap"
									style={{
										top: "50%",
										left: "50%",
										transform: "translate(-50%, -50%)",
									}}
								>
									کیف پول
								</div>
								{selectedButton === 2 && (
									<div className="absolute z-10">
										<img
											src={dashboardButtonBorder}
											alt="dashboardButtonBorder"
											style={{ width: 266 }}
										/>
									</div>
								)}
								<img
									src={dashboardButton}
									alt="dashboardButton"
									className="outline-none"
									style={{ width: 266 }}
								/>
							</div>
						</button>
					</NavLink>
				</div>

				<div className="absolute left-0 top-0 flex items-center z-0 ml-14 mt-10">
					<img
						src={dashboardContainer}
						alt="dashboardContainer"
						style={{ width: 1100, height: 600 }}
					/>
				</div>
				<Outlet />
			</div>
		</>
	);
};

export default Dashboard;
