import React from "react";
import { Outlet } from "react-router-dom";
import { NavLinkButton } from "../../components";

const Dashboard = () => {
	return (
		<>
			<div className="relative">
				<div className="absolute right-0 top-0 flex flex-col items-end justify-end mt-16 gap-5 mr-14">
					<NavLinkButton
						text="پروفایل"
						path="/dashboard/userProfile"
						number={0}
					/>
					<NavLinkButton
						text="اطلاعات شخصی"
						path="/dashboard/userInfo"
						number={1}
					/>
					<NavLinkButton
						text="ثبت سوال"
						path="/dashboard/submitQuestion"
						number={2}
					/>
					<NavLinkButton text="کیف پول" path="/dashboard/wallet" number={3} />
					<NavLinkButton
						text="نتایج پیشبینی"
						path="/dashboard/forecastResults"
						number={4}
					/>
				</div>

				<Outlet />
			</div>
		</>
	);
};

export default Dashboard;
