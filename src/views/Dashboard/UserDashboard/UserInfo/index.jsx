import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import {
	useAvatarStore,
	useProfileStore,
	userInfoYup,
	httpService,
} from "../../../../services";
import { Toast } from "../../../../components";
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
	const { id, setAvatarNumber, setName, setBiography } = useProfileStore();
	const [selectedAvatar, setSelectedAvatar] = useState(0);
	const [toastMessage, setToastMessage] = useState("");
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
	const [isSubmitted, setSubmitted] = useState(false);
	const [isError, setError] = useState(false);

	const formik = useFormik({
		initialValues: userInfoYup.initialValues,
		validationSchema: userInfoYup.validationSchema,
		validateOnChange: true,
		validateOnBlur: true,
		onSubmit: (values) => {
			setSubmitted(true);
			if (calculateProgress() !== 100) {
				setError(true);
				if (!formState.avatarSelected) {
					setToastMessage("لطفا آواتار موردنظر خود را انتخاب کنید");
				}
				if (formState.gender == "") {
					setToastMessage("لطفا جنسیت خود را انتخاب کنید");
				}
				if (formState.favoriteTopic == "") {
					setToastMessage("لطفا موضوع مورد علاقه خود را انتخاب کنید");
				}
				return;
			}
			const data = {
				user_name: formState.username,
				bio: formState.biography,
				location: formState.location,
				avatar: selectedAvatar + 1,
				job: formState.job,
				gender: formState.gender,
				age: formState.age,
				favorite_subject: formState.favoriteTopic,
			};

			httpService
				.put(`profiles/${id}/`, data)
				.then((res) => {
					console.log("Put profile API response:", res);
					setName(values.username);
					setBiography(values.biography);
					setAvatarNumber(selectedAvatar + 1);
					setToastMessage("اطلاعات با موفقیت ذخیره شد");
					setError(false);
				})
				.catch((err) => {
					console.log("Put profile API error:", err);
					setToastMessage("خطا در ذخیره اطلاعات");
					setError(true);
				});
		},
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
		setFormState((prev) => ({ ...prev, avatarSelected: true }));
	};

	useEffect(() => {
		setSelectedAvatar(getAvatarNumber() - 1);
	}, [getAvatarNumber()]);

	useEffect(() => {
		if (toastMessage) {
			setTimeout(() => {
				setToastMessage("");
			}, 3000);
		}
	}, [toastMessage]);

	return (
		<>
			<form id="authForm" onSubmit={formik.handleSubmit}>
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
						<div className="absolute inset-0 z-50 flex flex-col justify-center items-center mr-96 mt-96 pt-20 pr-96">
							<button
								type="submit"
								className="hover:scale-105 transition duration-300 ease-in-out outline-none border-none"
							>
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
										{...formik.getFieldProps("username")}
										onChange={(e) => {
											formik.handleChange(e);
											setFormState((prev) => ({
												...prev,
												username: e.target.value,
											}));
										}}
										placeholder="نام کاربری"
										className="relative w-full h-full bg-transparent px-4 outline-none text-white font-MorabbaMedium text-lg z-10 placeholder:text-white placeholder:font-MorabbaMedium placeholder:text-lg"
									/>
									{formik.touched.username && formik.errors.username && (
										<div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-red-500 text-sm">
											{formik.errors.username}
										</div>
									)}
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
										{...formik.getFieldProps("job")}
										onChange={(e) => {
											formik.handleChange(e);
											setFormState((prev) => ({
												...prev,
												job: e.target.value,
											}));
										}}
										className="relative w-full h-full bg-transparent px-4 outline-none text-white font-MorabbaMedium text-lg z-10 placeholder:text-white placeholder:font-MorabbaMedium placeholder:text-lg"
									/>
									{formik.touched.job && formik.errors.job && (
										<div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-red-500 text-sm">
											{formik.errors.job}
										</div>
									)}
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
											{...formik.getFieldProps("age")}
											className="relative w-full h-full bg-transparent px-4 outline-none text-white font-MorabbaMedium text-lg z-10 placeholder:text-white placeholder:font-MorabbaMedium placeholder:text-lg hide-spinner"
											onChange={(e) => {
												formik.handleChange(e);
												const value = e.target.value;
												setFormState((prev) => ({
													...prev,
													age: parseInt(value, 10),
												}));
											}}
										/>
										{formik.touched.age && formik.errors.age && (
											<div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-red-500 text-sm">
												{formik.errors.age}
											</div>
										)}
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
												defaultValue={formState.gender}
												onChange={(e) =>
													setFormState((prev) => ({
														...prev,
														gender: e.target.value,
													}))
												}
											>
												<option value="" disabled hidden>
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
										{...formik.getFieldProps("biography")}
										onChange={(e) => {
											formik.handleChange(e);
											setFormState((prev) => ({
												...prev,
												biography: e.target.value,
											}));
										}}
										className="relative w-full h-[80px] mb-4 bg-transparent px-4  outline-none text-white font-MorabbaMedium text-lg  z-10 resize-none no-scrollbar pt-4 pb-4 placeholder:text-white placeholder:font-MorabbaMedium placeholder:text-lg"
										style={{ verticalAlign: "top" }}
									/>
									{formik.touched.biography && formik.errors.biography && (
										<div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-red-500 text-sm">
											{formik.errors.biography}
										</div>
									)}
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
											{...formik.getFieldProps("location")}
											onChange={(e) => {
												formik.handleChange(e);
												setFormState((prev) => ({
													...prev,
													location: e.target.value,
												}));
											}}
											className="relative w-full h-full bg-transparent px-4 outline-none text-white font-MorabbaMedium text-lg z-10 placeholder:text-white placeholder:font-MorabbaMedium placeholder:text-[15px]"
										/>
										{formik.touched.location && formik.errors.location && (
											<div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-red-500 text-[11px] pr-20">
												{formik.errors.location}
											</div>
										)}
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
												defaultValue={formState.favoriteTopic}
												onChange={(e) =>
													setFormState((prev) => ({
														...prev,
														favoriteTopic: e.target.value,
													}))
												}
											>
												<option value="" disabled hidden>
													موضوع مورد علاقه
												</option>
												{topics.map((category) => (
													<option
														key={category}
														value={category}
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
			</form>
			{/* Toast */}
			{isSubmitted && !isError && (
				<Toast type="success" message={toastMessage} position="top-center" />
			)}
			{isSubmitted && isError && (
				<Toast type="error" message={toastMessage} position="top-center" />
			)}
		</>
	);
};

export default UserInfo;
