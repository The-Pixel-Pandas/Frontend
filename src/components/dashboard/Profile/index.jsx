import React, { useEffect, useMemo } from "react";
import { useProfileStore, httpService } from "../../../services";
import { ProfileMedal, UserAvatar, ProfileInfoContainer } from "../../index";
import userInfoHeader from "../../../assets/images/userInfoHeader.png";
import adminInfoHeader from "../../../assets/images/adminInfoHeader.png";
import userProfileBody from "../../../assets/images/userProfileBody.png";
import adminProfileBody from "../../../assets/images/adminProfileBody.png";

const Profile = () => {
	const {
		id,
		name,
		biography,
		rankTotalProfit,
		rankTotalVolume,
		winRate,
		medals,
		isAdmin,
		setName,
		setBiography,
		setProfit,
		setVolume,
		setMedals,
		setWinRate,
		setRankTotalProfit,
		setRankTotalVolume,
	} = useProfileStore.getState();
	const goldMedal = useMemo(
		() => medals.filter((medal) => medal === 1),
		[medals]
	);
	const silverMedal = useMemo(
		() => medals.filter((medal) => medal === 2),
		[medals]
	);
	const bronzeMedal = useMemo(
		() => medals.filter((medal) => medal === 3),
		[medals]
	);

	useEffect(() => {
		httpService
			.get(`profiles/${id}/`)
			.then((res) => {
				console.log("Get Profile API Response: ", res);
				if (
					res.user_name !== name ||
					res.bio !== biography ||
					res.profit !== rankTotalProfit ||
					res.volume !== rankTotalVolume ||
					res.winrate !== winRate ||
					res.medals !== medals ||
					res.rank_total_profit !== rankTotalProfit ||
					res.rank_total_volume !== rankTotalVolume
				) {
					setName(res.user_name);
					setBiography(res.bio);
					setProfit(res.profit);
					setVolume(res.volume);
					setMedals(res.medals);
					setWinRate(res.winrate);
					setRankTotalProfit(res.rank_total_profit);
					setRankTotalVolume(res.rank_total_volume);
				}
			})
			.catch((err) => {
				console.error("Get Profile API Error: ", err);
			});
	}, [id]);

	return (
		<>
			{/* Header Container */}
			<div className="absolute">
				<div className="top-1/2 left-0 mt-11 ml-40">
					<div className="relative">
						<img
							src={isAdmin ? adminInfoHeader : userInfoHeader}
							alt="infoHeader"
							style={{ width: 900, height: 235 }}
						/>
						<div className="absolute inset-0 flex flex-col justify-center items-center ml-10 pr-10 ">
							<div className="flex flex-row gap-10">
								<div className="flex flex-col gap-4 mt-5 w-[800px] " dir="rtl">
									<div className="text-4xl font-MorabbaBold text-white text-ellipsis overflow-hidden no-scrollbar">
										{name}
									</div>
									<div className="text-xl font-MorabbaMedium text-white h-20 overflow-y-scroll no-scrollbar">
										{biography}
									</div>
								</div>
								<div className="flex flex-col flex-shrink-0" dir="rtl">
									<UserAvatar width={130} height={130} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="absolute">
				{/* Body Container */}
				<div className="top-1/2 left-0 mt-72 ml-40">
					<div className="relative">
						<img
							src={isAdmin ? adminProfileBody : userProfileBody}
							alt="profileBody"
							style={{ height: 350, width: 900 }}
						/>
						{/* Medal Container */}
						<div className="absolute inset-0 top-0 left-0 mt-8 ml-0">
							<div className="flex flex-row gap-0">
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
						{/* Info Container */}
						<div className="absolute inset-0 bottom-0 transform top-1/2 mt-2">
							<div className="flex flex-row gap-10 absolute ml-5">
								<div>
									{rankTotalProfit === undefined ? (
										<div className="text-lg font-MorabbaBold text-white animate-pulse ml-[70px] whitespace-nowrap">
											...در حال بارگذاری
										</div>
									) : (
										<ProfileInfoContainer
											text="رتبه در جدول امتیاز عملکرد"
											amount={rankTotalProfit}
										/>
									)}
								</div>
								<div>
									{rankTotalVolume === undefined ? (
										<div className="text-lg font-MorabbaBold text-white animate-pulse ml-32 whitespace-nowrap">
											...در حال بارگذاری
										</div>
									) : (
										<ProfileInfoContainer
											text="رتبه در جدول میزان مشارکت"
											amount={rankTotalVolume}
										/>
									)}
								</div>
								<div>
									{winRate === undefined ? (
										<div className="text-lg font-MorabbaBold text-white animate-pulse ml-34 whitespace-nowrap">
											...در حال بارگذاری
										</div>
									) : (
										<ProfileInfoContainer
											text="درصد پاسخ صحیح"
											amount={winRate}
										/>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Profile;
