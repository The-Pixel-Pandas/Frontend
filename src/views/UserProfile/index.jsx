import React from "react";
import { UserAvatar } from "../../components";
import medalBox from "../../assets/images/medalBox.png";
import { ProfileInfoContainer } from "../../components";

const UserProfile = () => {
	return (
		<>
			{/* Header */}
			<div className="flex flex-col absolute gap-10 top-1/2 left-1/2">
				<div className="flex flex-row gap-5 ml-17 mt-20">
					<div className="flex flex-col  gap-4 " dir="rtl">
						<div className="text-4xl font-MorabbaMedium text-white">
							نام کاربری
						</div>
						<div className="text-lg font-MorabbaMedium text-white">
							توضیحات (بیوگرافی)
						</div>
					</div>
					<div className="flex flex-col gap-4 " dir="rtl">
						<UserAvatar width={100} height={100} />
					</div>
				</div>
			</div>
			<div className="absolute">
				{/* Medal Container */}
				<div className="top-1/2 left-0  mt-48 ml-40">
					<div className="relative">
						<img src={medalBox} alt="medalBox" />
						<div className="absolute inset-0 top-1 left-[330px]">
							<div className="text-white font-MorabbaMedium text-lg">
								مدال های کسب شده
							</div>
						</div>
					</div>
				</div>
				{/* Info Container */}
				<div className="flex flex-row gap-5 absolute top-1/2 left-0  mt-60 ml-40">
					<div>
						<ProfileInfoContainer text="درصد پاسخ صحیح" amount={145} />
					</div>
					<div>
						<ProfileInfoContainer text="تعداد مشارکت" amount={145} />
					</div>
					<div>
						<ProfileInfoContainer
							text="رتبه فعلی در جدول امتیازات"
							amount={145}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default UserProfile;
