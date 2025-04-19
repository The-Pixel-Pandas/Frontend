import React, { useEffect, useState } from "react";
import { useAvatarStore } from "../../services";
import avatarInfoContainer from "../../assets/images/avatarInfoContainer.png";
import avatarBorder from "../../assets/images/avatarBorder.png";
import inputUser from "../../assets/images/inputUser.png";
import dropDownIcon from "../../assets/images/dropDownIcon.png";
import inputBioUser from "../../assets/images/inputBioUser.png";
const UserInfo = () => {
	const { avatars, setAvatarNumber, getAvatarNumber } = useAvatarStore();
	const [selectedAvatar, setSelectedAvatar] = useState(0);
	const [selectedTopic, setSelectedTopic] = useState("");

	const topics = [
		"بازی‌های ویدیویی",
		"برنامه‌نویسی",
		"هنر دیجیتال",
		"انیمیشن",
		"تکنولوژی",
		"ورزش",
		"موسیقی",
	];

	const handleAvatarSelect = (index) => {
		setSelectedAvatar(index);
		setAvatarNumber(index + 1);
	};

	const handleTopicChange = (e) => {
		setSelectedTopic(e.target.value);
	};

	useEffect(() => {
		setSelectedAvatar(getAvatarNumber() - 1);
	}, [getAvatarNumber()]);

	return (
		<>
			{/* Right Inputs */}
			<div className="absolute inset-0 left-1/2 -translate-x-1/2 mt-16 ml-40 z-50">
				{/* Avatar Selector */}
				<div className="flex flex-col gap-0.5">
					{/* Title */}
					<div className="text-white font-MorabbaMedium text-lg ml-72">
						آواتار موردنظر را انتخاب کنید
					</div>

					{/* Avatars */}
					<div className="relative">
						{/* Container */}
						<img
							src={avatarInfoContainer}
							alt="avatarInfoContainer"
							className="w-[500px] h-[100px]"
						/>

						{/* Avatar scrollable container */}
						<div className="absolute inset-0 left-6 top-3 right-10 pr-2 ">
							<div
								className="flex flex-row gap-5 overflow-x-auto w-[460px] pb-2 no-scrollbar  "
								dir="rtl"
							>
								{avatars.map((avatar, index) => (
									<div
										key={index}
										className={`relative flex-shrink-0 cursor-pointer ${selectedAvatar === index ? "opacity-100" : "opacity-80"}`}
										onClick={() => handleAvatarSelect(index)}
									>
										<img
											src={avatar}
											alt={`avatar-${index + 1}`}
											className="w-[76px] h-[76px] object-contain"
										/>
										<div className="absolute inset-0">
											<img
												src={avatarBorder}
												alt="avatarBorder"
												className={`w-[75px] h-[76px] object-contain ${selectedAvatar === index ? "opacity-100" : "hidden"}`}
											/>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>

				{/* User Name Input */}
				<div className="flex flex-col gap-0.5 mt-4 ml-72 ">
					<div className="text-white font-MorabbaMedium text-lg ml-28 mb-0.5">
						نام کاربری
					</div>
					<div className="relative w-[200px] h-[50px]">
						<img
							src={inputUser}
							alt="inputUser"
							className="absolute inset-0 w-full h-full"
						/>
						<input
							type="text"
							dir="rtl"
							className="relative w-full h-full bg-transparent px-4 outline-none text-white placeholder-white/70 z-10"
						/>
					</div>
				</div>

				{/* Sexuality Input */}
				<div className="flex flex-col gap-0.5 mt-4 ml-72 ">
					<div className="text-white font-MorabbaMedium text-lg ml-32 mb-0.5">
						جنسیت
					</div>
					<div className="relative w-[200px] h-[50px]">
						<img
							src={inputUser}
							alt="inputUser"
							className="absolute inset-0 w-full h-full"
						/>
						<input
							type="text"
							dir="rtl"
							className="relative w-full h-full bg-transparent px-4 outline-none text-white placeholder-white/70 z-10"
						/>
					</div>
				</div>

				{/* Age Input */}
				<div className="flex flex-col gap-0.5 mt-4 ml-72 ">
					<div className="text-white font-MorabbaMedium text-lg ml-40 mb-0.5">
						سن
					</div>
					<div className="relative w-[200px] h-[50px]">
						<img
							src={inputUser}
							alt="inputUser"
							className="absolute inset-0 w-full h-full"
						/>
						<input
							type="text"
							dir="rtl"
							className="relative w-full h-full bg-transparent px-4 outline-none text-white placeholder-white/70 z-10"
						/>
					</div>
				</div>

				{/* Favorite Topic Input */}
				<div className="flex flex-col gap-0.5 mt-4 ml-72 ">
					<div className="text-white font-MorabbaMedium text-lg ml-16 mb-0.5">
						موضوع موردعلاقه
					</div>
					<div className="relative w-[200px] h-[50px]">
						<img
							src={inputUser}
							alt="inputUser"
							className="absolute inset-0 w-full h-full"
						/>
						<div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-20">
							<img src={dropDownIcon} alt="dropDownIcon" className="w-5 h-5" />
						</div>
						<select
							value={selectedTopic}
							onChange={handleTopicChange}
							dir="rtl"
							className="relative w-full h-full bg-transparent px-4 outline-none text-white z-10 appearance-none cursor-pointer [&>*]:rounded-lg"
						>
							<option value="" disabled className="bg-secondary "></option>
							{topics.map((topic, index) => (
								<option
									key={index}
									value={topic}
									className="bg-secondary rounded-lg"
								>
									{topic}
								</option>
							))}
						</select>
					</div>
				</div>
			</div>
			{/* left Inputs */}
			<div className="absolute inset-0 left-1/4 -translate-x-1/4 mt-48 ml-50 ">
				{/* Job Input */}
				<div className="flex flex-col gap-0.5 mt-4 ml-72 ">
					<div className="text-white font-MorabbaMedium text-lg ml-36 mb-0.5">
						شغل
					</div>
					<div className="relative w-[200px] h-[50px]">
						<img
							src={inputUser}
							alt="inputUser"
							className="absolute inset-0 w-full h-full"
						/>
						<input
							type="text"
							dir="rtl"
							className="relative w-full h-full bg-transparent px-4 outline-none text-white placeholder-white/70 z-10"
						/>
					</div>
				</div>

				{/* Location Input */}
				<div className="flex flex-col gap-0.5 mt-4 ml-72 ">
					<div className="text-white font-MorabbaMedium text-lg ml-[101px] mb-0.5">
						محل زندگی
					</div>
					<div className="relative w-[200px] h-[50px]">
						<img
							src={inputUser}
							alt="inputUser"
							className="absolute inset-0 w-full h-full"
						/>
						<input
							type="text"
							dir="rtl"
							className="relative w-full h-full bg-transparent px-4 outline-none text-white placeholder-white/70 z-10"
						/>
					</div>
				</div>

				{/* Bio Input */}
				<div className="flex flex-col gap-0.5 mt-4 ml-72 ">
					<div className="text-white font-MorabbaMedium text-lg ml-[50px] mb-0.5">
						توضیح (بیوگرافی)
					</div>
					<div className="relative w-[200px] h-[150px]">
						<img
							src={inputBioUser}
							alt="inputBioUser"
							className="absolute inset-0 w-full h-full"
						/>
						<textarea
							dir="rtl"
							className="relative w-full h-full bg-transparent px-4 pt-3 outline-none text-white placeholder-white/70 z-10 resize-none"
							style={{ verticalAlign: 'top' }}
						/>
					</div>
				</div>
			</div>

			{/* Tasks */}
			{/* <div className="absolute inset-0 left-0 mt-16">
				<div className="relative">
					<img
						src={taskInfoContainer}
						alt="taskInfoContainer"
						className="w-[500px] h-[100px]"
					/>
					<div className="absolute inset-0 left-6 top-3 right-10 pr-2 ">
						<div className="flex flex-col gap-1">
							<div className="relative">
								<img src={taskInfo} alt="taskInfo" className="w-[20px]" />
								<div className="absolute inset-0 left-6 top-3 right-10 pr-2 ">
									
								</div>
							</div>
						</div>
					</div>
				</div>
			</div> */}
		</>
	);
};

export default UserInfo;
