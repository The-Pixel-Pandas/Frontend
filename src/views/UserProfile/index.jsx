import React from "react";
import { UserAvatar, ProfileInfoContainer } from "../../components";
import medalBox from "../../assets/images/medalBox.png";
import { ProfileMedal } from "../../components";
// import { useProfileStore } from "../../services";

const UserProfile = () => {
	// TODO: after fix ui replace data with this parameters
	// const { avatarNumber, name, biography, transaction, volume, rank, medals } =
	// 	useProfileStore.getState();
	// const goldMedal = medals.filter((medal) => medal === 1);
	// const silverMedal = medals.filter((medal) => medal === 2);
	// const bronzeMedal = medals.filter((medal) => medal === 3);

	return (
		<>
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
						<div className="absolute inset-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-4">
							<div className="flex flex-row gap-5">
								<div className="flex flex-col">
									<ProfileMedal medalNumber={1} medalAmount={4} />
								</div>
								<div className="flex flex-col">
									<ProfileMedal medalNumber={2} medalAmount={2} />
								</div>
								<div className="flex flex-col">
									<ProfileMedal medalNumber={3} medalAmount={4} />
								</div>
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
