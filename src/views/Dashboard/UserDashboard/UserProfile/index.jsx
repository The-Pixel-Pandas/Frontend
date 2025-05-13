import React from "react";
import { useProfileStore } from "../../../../services";
import {
	ProfileMedal,
	ProfileHeaderContainer,
	UserAvatar,
	ProfileInfoContainer,
} from "../../../../components";
import infoContainer from "../../../../assets/images/infoContainer.png";
import medalBox from "../../../../assets/images/medalBox.png";

const UserProfile = () => {
	const { name, biography, transaction, volume, rank, medals } =
		useProfileStore.getState();
	const goldMedal = medals.filter((medal) => medal === 1);
	const silverMedal = medals.filter((medal) => medal === 2);
	const bronzeMedal = medals.filter((medal) => medal === 3);

	return (
		<>
			{/* Header Container */}
			<div className="absolute">
				<div className=" flex flex-row justify-between items-center gap-4 ml-40 mt-15">
					<div className="flex flex-col text-lg">
						<ProfileHeaderContainer text={biography} />
					</div>
					<div className="relative">
						<div>
							<img
								src={infoContainer}
								alt="infoContainer"
								style={{ width: 290, height: 150 }}
							/>
						</div>
						<div className="absolute inset-0 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-16">
							<div className="flex justify-center items-center ">
								<UserAvatar width={115} height={115} />
							</div>
						</div>
					</div>
					<div className="flex flex-col text-3xl">
						<ProfileHeaderContainer text={name} />
					</div>
				</div>
			</div>
			<div className="absolute">
				{/* Medal Container */}
				<div className="top-1/2 left-0  mt-56	ml-40">
					<div className="relative">
						<img
							src={medalBox}
							alt="medalBox"
							style={{ height: 220, width: 900 }}
						/>
						<div className="absolute inset-0 top-1 left-[375px]">
							<div className="text-white font-MorabbaMedium text-lg">
								مدال های کسب شده
							</div>
						</div>
						<div className="absolute inset-0 top-1/2 left-0 transform -translate-y-1/2 mt-0 ml-0">
							<div className="flex flex-row gap-0 ">
								<div className="flex flex-col">
									<ProfileMedal
										medalNumber={3}
										medalAmount={bronzeMedal.length}
									/>
								</div>
								<div className="flex flex-col">
									<ProfileMedal
										medalNumber={2}
										medalAmount={silverMedal.length}
									/>
								</div>

								<div className="flex flex-col">
									<ProfileMedal
										medalNumber={1}
										medalAmount={goldMedal.length}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* Info Container */}
				<div className="flex flex-row gap-5 absolute top-1/2 left-0  mt-60 ml-40">
					<div>
						<ProfileInfoContainer text="درصد پاسخ صحیح" amount={transaction} />
					</div>
					<div>
						<ProfileInfoContainer text="تعداد مشارکت" amount={volume} />
					</div>
					<div>
						<ProfileInfoContainer
							text="رتبه فعلی در جدول امتیازات"
							amount={rank}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default UserProfile;
