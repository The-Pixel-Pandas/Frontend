import React from "react";
import { Outlet } from "react-router-dom";
import { NavLinkButton } from "../../../components";

const Dashboard = () => {
	return (
		<>
			<div className="relative">
				<div className="absolute right-0 top-0 flex flex-col items-end justify-end mt-16 gap-0.5 mr-14">
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
					<NavLinkButton text="تسک ها" path="/dashboard/tasks" number={2} />
					<NavLinkButton
						text="ثبت سوال"
						path="/dashboard/submitQuestion"
						number={3}
					/>
					<NavLinkButton text="کیف پول" path="/dashboard/wallet" number={4} />
					<NavLinkButton
						text="نتایج پیشبینی"
						path="/dashboard/forecastResults"
						number={5}
					/>
					{/* <NavLinkButton
						text="اعلانات"
						path="/dashboard/notification"
						number={6}
					/> */}
				</div>

				<Outlet />
			</div>
		</>
	);
};

export default Dashboard;
