import React from "react";
import { UserAvatar } from "../../components";

const UserProfile = () => {
	return (
		<>
			<div className="flex flex-col absolute top-1/2 left-1/2 w-full h-full ">
				<div className="flex flex-row gap-3 ">
					<div className="flex flex-col mt-20 gap-4 " dir="rtl">
						<div className="text-4xl font-MorabbaMedium text-white">
							نام کاربری
						</div>
						<div className="text-lg font-MorabbaMedium text-white">
							توضیحات (بیوگرافی)
						</div>
					</div>
					<div className="flex flex-col mt-20 gap-4 " dir="rtl">
						<UserAvatar width={100} height={100} />
					</div>
				</div>
			</div>
		</>
	);
};

export default UserProfile;
