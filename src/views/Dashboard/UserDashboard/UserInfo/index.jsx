import React, { useEffect, useState } from "react";
import { useAvatarStore, useProfileStore ,userInfoYup } from "../../../../services";
import avatarBorder from "../../../../assets/images/avatarBorder.png";
import inputUser from "../../../../assets/images/inputUser.png";
import dropDownIcon from "../../../../assets/images/dropDownIcon.png";
import inputBioUser from "../../../../assets/images/inputBioUser.png";
import userInfoContainer from "../../../../assets/images/userInfoContainer.png";
import userInfoBox from "../../../../assets/images/userInfoBox.png";
import inputUser2 from "../../../../assets/images/inputUser2.png";
import userInfoButton from "../../../../assets/images/userInfoButton.png";

const UserInfo = () => {
	const { avatars, getAvatarNumber } = useAvatarStore();
	const { setAvatarNumber, setName, setBiography } = useProfileStore();
	const [selectedAvatar, setSelectedAvatar] = useState(0);

	const [formState, setFormState] = useState({
		avatarSelected: false,
		username: "",
		job: "",
		age: "",
		gender: "",
		biography: "",
		location: "",
		favoriteTopic: "",
	});

	const calculateProgress = () => {
		const fields = Object.values(formState);
		const filledFields = fields.filter(
			(field) => field !== "" && field !== false
		).length;
		return (filledFields / fields.length) * 100;
	};

	const progress = calculateProgress();

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
		setFormState((prev) => ({ ...prev, avatarSelected: true }));
	};

	useEffect(() => {
		setSelectedAvatar(getAvatarNumber() - 1);
	}, [getAvatarNumber()]);

	return (
		<>
			<div className="absolute left-0 top-0 flex items-center z-0 ml-14 mt-10">
				<div className="relative">
					{/* BackGround Image */}
					<img
						src={userInfoContainer}
						alt="dashboardContainer"
						style={{ width: 1100, height: 600 }}
					/>
					{/* Text */}
					<div className="absolute inset-0 z-50 flex flex-col right-1/2 translate-x-1/2 mr-72 mt-28">
						<div
							className=" text-white text-4xl font-MorabbaMedium whitespace-nowrap"
							dir="rtl"
						>
							پروفایل خود را تکمیل کنید
						</div>
						<div
							className=" text-white text-4xl font-MorabbaMedium whitespace-nowrap"
							dir="rtl"
						>
							پاداش دریافت کنید !
						</div>
					</div>
					{/* Progress Bar */}
					<div className="absolute inset-0 z-50 flex flex-col right-1/2 translate-x-1/2 mr-80 mt-60">
						<div className="flex flex-col gap-1 justify-center items-center mb-2">
							<div className="w-[320px] h-4 bg-[#3B2F6F] rounded-full overflow-hidden">
								<div
									className="h-full bg-[#9F6AD4] transition-all duration-500 ease-in-out"
									style={{ width: `${progress}%` }}
								></div>
							</div>
							<div className="text-white font-MorabbaMedium text-2xl ml-72 mt-1">
								{Math.round(progress).toLocaleString("fa")}%
							</div>
						</div>
					</div>

					{/* Button */}
					<div className="absolute inset-0 z-50 flex flex-col justify-center items-center mr-96 mt-96 pt-20 pr-96 ">
						<button className="hover:scale-105 transition duration-300 ease-in-out ">
							<div className="relative">
								<img
									src={userInfoButton}
									alt="userInfoButton"
									style={{ width: 200, height: 50 }}
								/>
								<div className="absolute inset-0 z-50 flex items-center justify-center">
									<div className="text-white font-MorabbaMedium text-lg whitespace-nowrap">
										ذخیره تغییرات
									</div>
								</div>
							</div>
						</button>
					</div>
				</div>
			</div>

			<div className="w-full h-full flex justify-center items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-80 pt-10 pl-32">
				<div className="relative">
					{/* UserInfo Box Image */}
					<img
						src={userInfoBox}
						alt="userInfoBox"
						style={{ width: 600, height: 550 }}
						className="z-10"
					/>

					{/* Avatar Box */}
					<div className="absolute inset-0 z-20 left-1/2 -translate-x-1/2 mt-5">
						<div className="flex flex-col gap-1 justify-center items-center">
							{/* Avatar Title */}
							<div className="text-white font-MorabbaMedium text-2xl whitespace-nowrap ml-52">
								آواتار موردنظر را انتخاب کنید
							</div>
							{/* Avatar List */}
							<div
								className="flex flex-row gap-5 overflow-x-auto w-[485px] pb-2 pr-2 pl-2 no-scrollbar h-[120px] items-center "
								dir="rtl"
							>
								{avatars.map((avatar, index) => (
									<div
										key={index}
										className={`relative flex-shrink-0 cursor-pointer ${selectedAvatar === index ? "opacity-100 " : "opacity-80"} transition duration-300 ease-in-out`}
										onClick={() => handleAvatarSelect(index)}
										onMouseOver={(e) => {
											e.currentTarget.style.transform = "scale(1.2)";
										}}
										onMouseLeave={(e) => {
											e.currentTarget.style.transform = "scale(1)";
										}}
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

					<div className="absolute inset-0 z-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 mt-6">
						<div className="flex flex-col justify-center items-center gap-5 ">
							{/* User Name Input */}
							<div className="relative w-[475px] h-[45px]">
								<img
									src={inputUser}
									alt="inputUser"
									className="absolute inset-0 w-full h-full"
								/>
								<input
									type="text"
									dir="rtl"
									onChange={(e) => {
										setName(e.target.value);
										setFormState((prev) => ({
											...prev,
											username: e.target.value,
										}));
									}}
									placeholder="نام کاربری"
									className="relative w-full h-full bg-transparent px-4 outline-none text-white font-MorabbaMedium text-lg z-10 placeholder:text-white placeholder:font-MorabbaMedium placeholder:text-lg"
								/>
							</div>

							{/* Job Input */}
							<div className="relative w-[475px] h-[45px]">
								<img
									src={inputUser}
									alt="inputUser"
									className="absolute inset-0 w-full h-full"
								/>
								<input
									type="text"
									dir="rtl"
									placeholder="شغل"
									onChange={(e) =>
										setFormState((prev) => ({ ...prev, job: e.target.value }))
									}
									className="relative w-full h-full bg-transparent px-4 outline-none text-white font-MorabbaMedium text-lg z-10 placeholder:text-white placeholder:font-MorabbaMedium placeholder:text-lg"
								/>
							</div>

							{/* Age and Gender Input */}
							<div className="flex flex-row gap-2 items-center justify-center">
								{/* Age Input */}
								<div className="relative w-[230px] h-[45px]">
									<img
										src={inputUser2}
										alt="inputUser"
										className="absolute inset-0 w-full h-full"
									/>
									<input
										type="text"
										dir="rtl"
										placeholder="سن"
										className="relative w-full h-full bg-transparent px-4 outline-none text-white font-MorabbaMedium text-lg z-10 placeholder:text-white placeholder:font-MorabbaMedium placeholder:text-lg hide-spinner"
										onChange={(e) => {
											const value = e.target.value;
											e.target.value = value.replace(
												/[0-9]/g,
												(d) => "۰۱۲۳۴۵۶۷۸۹"[d]
											);
											setFormState((prev) => ({ ...prev, age: value }));
										}}
										onKeyDown={(e) => {
											if (e.key === "Backspace") return;
											if (!/[0-9]/.test(e.key)) {
												e.preventDefault();
											}
										}}
									/>
								</div>

								{/* Gender Input */}
								<div className="relative w-[230px] h-[45px]">
									<img
										src={inputUser2}
										alt="inputUser"
										className="absolute inset-0 w-full h-full"
									/>
									<div className="relative w-full h-full">
										<select
											className="relative w-full h-full bg-transparent px-4 outline-none text-white font-MorabbaMedium text-lg z-10 appearance-none rounded-tl-md rounded-tr-md "
											dir="rtl"
											style={{ backgroundImage: "none" }}
											onChange={(e) =>
												setFormState((prev) => ({
													...prev,
													gender: e.target.value,
												}))
											}
										>
											<option value="" disabled hidden selected>
												جنسیت
											</option>
											<option
												value="male"
												style={{
													background: "#2D1950",
													color: "white",
													fontWeight: "bold",
												}}
											>
												مرد
											</option>
											<option
												value="female"
												style={{
													background: "#2D1950",
													color: "white",
													fontWeight: "bold",
												}}
											>
												زن
											</option>
										</select>
										<img
											src={dropDownIcon}
											alt="dropDownIcon"
											className="absolute left-0 ml-2 top-1/2 -translate-y-1/2"
										/>
									</div>
								</div>
							</div>

							{/* Bio Input */}
							<div className="relative w-[475px] h-[100px] ">
								<img
									src={inputBioUser}
									alt="inputBioUser"
									className="absolute inset-0 w-full h-full "
								/>
								<textarea
									dir="rtl"
									placeholder="توضیحات (بیوگرافی)"
									onChange={(e) => {
										setBiography(e.target.value);
										setFormState((prev) => ({
											...prev,
											biography: e.target.value,
										}));
									}}
									className="relative w-full h-[80px] mb-4 bg-transparent px-4  outline-none text-white font-MorabbaMedium text-lg  z-10 resize-none no-scrollbar pt-4 pb-4 placeholder:text-white placeholder:font-MorabbaMedium placeholder:text-lg"
									style={{ verticalAlign: "top" }}
								/>
							</div>

							{/* Location and Favorite Input */}
							<div className="flex flex-row gap-2 items-center justify-center">
								{/* Location Input */}
								<div className="relative w-[230px] h-[45px]">
									<img
										src={inputUser2}
										alt="inputUser"
										className="absolute inset-0 w-full h-full"
									/>
									<input
										type="text"
										dir="rtl"
										placeholder="محل زندگی"
										onChange={(e) =>
											setFormState((prev) => ({
												...prev,
												location: e.target.value,
											}))
										}
										className="relative w-full h-full bg-transparent px-4 outline-none text-white font-MorabbaMedium text-lg z-10 placeholder:text-white placeholder:font-MorabbaMedium placeholder:text-lg"
									/>
								</div>

								{/* Favorite Input */}
								<div className="relative w-[230px] h-[45px]">
									<img
										src={inputUser2}
										alt="inputUser"
										className="absolute inset-0 w-full h-full"
									/>
									<div className="relative w-full h-full">
										<select
											className="relative w-full h-full bg-transparent px-4 outline-none text-white font-MorabbaMedium text-lg z-10 appearance-none  "
											dir="rtl"
											style={{ backgroundImage: "none" }}
											onChange={(e) =>
												setFormState((prev) => ({
													...prev,
													favoriteTopic: e.target.value,
												}))
											}
										>
											<option value="" disabled hidden selected>
												موضوع مورد علاقه
											</option>
											{topics.map((category) => (
												<option
													key={category.id}
													value={category.id}
													style={{
														background: "#2D1950",
														color: "white",
														fontWeight: "bold",
													}}
												>
													{category}
												</option>
											))}
										</select>
										<img
											src={dropDownIcon}
											alt="dropDownIcon"
											className="absolute left-0 ml-2 top-1/2 -translate-y-1/2"
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default UserInfo;
