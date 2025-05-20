import React, { useEffect, useState } from "react";
import { NotificationBox } from "../../../../components";
import { httpService } from "../../../../services";
import bell from "../../../../assets/images/bell.png";
import adminContainer from "../../../../assets/images/adminContainer.png";
import blueBox from "../../../../assets/images/blueBox.png";
import purpleBox from "../../../../assets/images/purpleBox.png";

const Notification = () => {
	const [notifications, setNotifications] = useState([]);

	const handleGetData = () => {
		try {
			httpService
				.get("https://mocki.io/v1/638e78f8-9e12-4ccb-a7f9-8b382d27dbdf")
				.then((res) => {
					setNotifications(res);
					console.log("Notification Get API:", res);
				})
				.catch((err) => console.error("Notification Get API Error:", err));
		} catch (err) {
			console.error("Notification Get API Error:", err);
		}
	};
	useEffect(() => {
		handleGetData();
	}, []);

	return (
		<>
			<div className="absolute left-0 top-0 flex items-center z-0 ml-14">
				<div className="relative">
					{/* BackGround Image */}
					<img
						src={adminContainer}
						alt="adminContainer"
						style={{ width: 1100, height: 600 }}
						className="mt-10"
					/>
					{/* Header */}
					<div className="absolute inset-0 top-0 left-1/2 ml-16 mt-20">
						<div className=" flex flex-row items-center ">
							<div className=" flex flex-col gap-1 mr-2.5 " dir="rtl">
								<div className=" font-MorabbaBold whitespace-nowrap text-2xl text-white">
									اعلان ها و پیام ها
								</div>
								<div className=" font-MorabbaMedium whitespace-nowrap text-xl text-white">
									مدیریت اعلان ها ، پیام ها و اطلاعیه های سیستم
								</div>
							</div>
							<img src={bell} alt="bell" style={{ width: 90, height: 90 }} />
						</div>
					</div>
					{/* Notifications */}
					<div className="absolute inset-0 left-0 top-0 flex items-center z-50 ml-14 mt-44">
						<div className="flex flex-col items-center h-[400px] gap-10 overflow-y-scroll no-scrollbar ">
							{notifications.map((notification, index) => {
								const notificationBackground =
									index % 2 === 0 ? blueBox : purpleBox;
								return (
									<NotificationBox
										key={index}
										title={notification.type}
										description={notification.description}
										background={notificationBackground}
									/>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Notification;
