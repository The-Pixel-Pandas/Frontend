import React from "react";
import { Outlet } from "react-router-dom";
import { NavLinkButton } from "../../../components";

const AdminDashboard = () => {
	return (
		<>
			<div className="relative">
				<div className="absolute right-0 top-0 flex flex-col items-end justify-end mt-16 gap-1 mr-14">
					<NavLinkButton
						text="پروفایل"
						path="/dashboard/adminProfile"
						number={0}
						isAdminButton={true}
					/>
					<NavLinkButton
						text="ثبت سوال "
						path="/dashboard/adminSubmitQuestion"
						number={1}
						isAdminButton={true}
					/>
					<NavLinkButton
						text=" مدیریت سوالات"
						path="/dashboard/adminManageQuestion"
						number={2}
						isAdminButton={true}
					/>
					<NavLinkButton
						text="ثبت خبر "
						path="/dashboard/adminSubmitNews"
						number={3}
						isAdminButton={true}
					/>
					<NavLinkButton
						text=" افزودن تسک جدید"
						path="/dashboard/adminManageTasks"
						number={4}
						isAdminButton={true}
					/>
					<NavLinkButton
						text="تعیین نتایج سوالات"
						path="/dashboard/adminCloseQuestion"
						number={5}
						isAdminButton={true}
					/>
					<NavLinkButton
						text=" نتایج پیشبینی  "
						path="/dashboard/adminForecastResult"
						number={6}
						isAdminButton={true}
					/>
				</div>

				<Outlet />
			</div>
		</>
	);
};

export default AdminDashboard;
