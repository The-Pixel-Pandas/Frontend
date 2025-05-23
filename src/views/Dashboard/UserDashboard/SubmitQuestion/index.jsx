import React, { useState } from "react";
import { useCoinChooser } from "../../../../hooks";
import userSubmitBackground from "../../../../assets/images/userSubmitBackground.png";
import userSubmitBox from "../../../../assets/images/userSubmitBox.png";
import userSubmitTitle from "../../../../assets/images/userSubmitTitle.png";
import userSubmitDescription from "../../../../assets/images/userSubmitDescription.png";
import userSubmitCategoryContainer from "../../../../assets/images/userSubmitCategoryContainer.png";
import userSubmitUploadBox from "../../../../assets/images/userSubmitUploadBox.png";
import userSubmitUploadIcon from "../../../../assets/images/userSubmitUploadIcon.png";
import userSubmitCoinLogo from "../../../../assets/images/userSubmitCoinLogo.png";
import userSubmitCoinInput from "../../../../assets/images/userSubmitCoinInput.png";
import userSubmitIncreaseButton from "../../../../assets/images/userSubmitIncreaseButton.png";
import userSubmitDecreaseButton from "../../../../assets/images/userSubmitDecreaseButton.png";
import userSubmitButton from "../../../../assets/images/userSubmitButton.png";

const SubmitQuestion = () => {
	const [selectedCategory, setSelectedCategory] = useState("همه موارد");
	const [selectedImage, setSelectedImage] = useState(null);
	const { coin, increaseCoin, decreaseCoin } = useCoinChooser(10);
	const categories = [
		"همه موارد",
		"ورزشی",
		"سیاسی",
		"اجتماعی",
		"اقتصادی",
		"رمز ارزها",
		"موسیقی",
	];
	return (
		<>
			<div className="absolute left-0 top-0 flex items-center z-0 ml-14 mt-10">
				<div className="relative">
					{/* BackGround Image */}
					<img
						src={userSubmitBackground}
						alt="dashboardContainer"
						style={{ width: 1100, height: 600 }}
					/>
					{/* Form Container */}
					<div className="absolute inset-0 z-50 flex items-center justify-center ml-[430px] mb-8">
						<div className="relative">
							{/* Container Box */}
							<img
								src={userSubmitBox}
								alt="userSubmitBox"
								style={{ width: 573, height: 500 }}
							/>
							<div className="absolute inset-0 z-50 flex items-center flex-col mt-7 gap-3">
								{/* Title */}
								<div className="relative">
									<img
										src={userSubmitTitle}
										alt="userSubmitTitle"
										style={{ width: 503, height: 100 }}
									/>
									<textarea
										placeholder="سوال خود را وارد کنید :"
										className="absolute inset-0  h-full w-full  bg-transparent text-white text-xl font-MorabbaMedium placeholder:font-MorabbaMedium placeholder:text-white placeholder:text-2xl pr-10 pt-5 pl-10 border-none outline-none overflow-y-scroll no-scrollbar max-h-[100px] resize-none"
										style={{ direction: "rtl" }}
									/>
								</div>
								{/* Description */}
								<div className="relative">
									<img
										src={userSubmitDescription}
										alt="userSubmitDescription"
										style={{ width: 503, height: 190 }}
									/>
									<textarea
										placeholder="توضیحات :"
										className="absolute inset-0  h-full w-full  bg-transparent text-white text-xl font-MorabbaMedium placeholder:font-MorabbaMedium placeholder:text-white placeholder:text-2xl pr-10 pt-5 pl-10 border-none outline-none overflow-y-scroll no-scrollbar max-h-[200px] resize-none"
										style={{ direction: "rtl" }}
									/>
								</div>
								{/* Category */}
								<div className="relative">
									<img
										src={userSubmitCategoryContainer}
										alt="userSubmitCategoryContainer"
										style={{ scale: 0.85 }}
										className="z-10"
									/>
									<div
										className="absolute inset-0 z-50 flex items-center justify-center mr-80"
										dir="rtl"
									>
										<select
											className="text-white w-[120px] outline-none border-none font-MorabbaMedium bg-transparent"
											value={selectedCategory}
											onChange={(e) => setSelectedCategory(e.target.value)}
										>
											{categories.map((category) => (
												<option
													key={category}
													style={{
														background: "#462C6C",
														color: "white",
													}}
												>
													{category}
												</option>
											))}
										</select>
									</div>
									<div className="absolute inset-0 z-50 flex items-center justify-center ml-80">
										<div className="text-white font-MorabbaMedium text-xl whitespace-nowrap">
											دسته بندی ها
										</div>
									</div>
								</div>
								{/* Upload Box */}
								<div className="relative">
									<img
										src={userSubmitUploadBox}
										alt="userSubmitUploadBox"
										style={{ width: 503, height: 100 }}
										className="z-10"
									/>
									{selectedImage ? (
										// Selected Image
										<div
											className="absolute inset-0 mt-2 ml-52 z-50 flex items-center justify-center transition duration-300 ease-in-out hover:scale-110"
											style={{ width: 80, height: 80 }}
										>
											<img
												src={selectedImage}
												alt="selectedImage"
												className="w-full h-full"
											/>
										</div>
									) : (
										// Upload Input
										<label className="absolute inset-0 w-full flex flex-row items-center justify-center ">
											<img
												src={userSubmitUploadIcon}
												alt="userSubmitUploadIcon"
												style={{ width: 55, height: 55 }}
											/>
											<div className=" ml-1 text-white text-2xl font-MorabbaMedium">
												افزودن &nbsp; تصویر
											</div>
											<input
												type="file"
												className="hidden"
												onChange={(e) => {
													const file = e.target.files[0];
													if (file) {
														const reader = new FileReader();
														reader.onload = (e) => {
															setSelectedImage(e.target.result);
														};
														reader.readAsDataURL(file);
													}
												}}
											/>
										</label>
									)}
								</div>
							</div>
						</div>
					</div>
					<div className="absolute inset-0 z-50 flex flex-col gap-1 items-center mt-5 mr-[650px]">
						{/* Coin Logo */}
						<img
							src={userSubmitCoinLogo}
							alt="coinLogo"
							style={{
								width: 225,
								height: 175,
								animation: "resize 1.5s ease-in-out infinite",
							}}
							className="mr-5 mb-1"
						/>
						<style>
							{`
								@keyframes resize {
									0% {
										transform: scale(1);
									}
									50% {
										transform: scale(1.1);
									}
									100% {
										transform: scale(1);
									}
								}
							`}
						</style>
						{/* Coin Text */}
						<div className="text-white text-3xl font-MorabbaMedium text-nowrap">
							مقدار پاداش خود را تعیین کنید
						</div>
						{/* Coin Input */}
						<div className="flex flex-row gap-0.5 mt-5">
							<button
								onClick={decreaseCoin}
								className="text-white font-MorabbaRegular text-lg focus:outline-none hover:opacity-85 hover:scale-105 transition-all duration-300"
							>
								<img
									src={userSubmitDecreaseButton}
									alt="coinFuncButton"
									style={{ width: 60, height: 60 }}
								/>
							</button>
							<div className="relative">
								<div className="absolute inset-0 flex items-center justify-center">
									<span
										className="text-white font-MorabbaMedium text-2xl whitespace-nowrap text-center"
										dir="rtl"
									>
										{coin.toLocaleString("fa")}
									</span>
								</div>
								<img
									src={userSubmitCoinInput}
									alt="exchangeCoinInput"
									style={{ width: 120, height: 60 }}
								/>
							</div>
							<button
								onClick={increaseCoin}
								className="text-white font-MorabbaRegular text-lg focus:outline-none hover:opacity-85 hover:scale-105 transition-all duration-300"
							>
								<img
									src={userSubmitIncreaseButton}
									alt="coinFuncButton"
									style={{ width: 60, height: 60 }}
								/>
							</button>
						</div>

						<div className="mt-40">
							<div className="flex flex-col gap-1">
								{/* Submit Button */}
								<button className="focus:outline-none hover:opacity-85 hover:scale-105 transition-all duration-300">
									<div className="relative">
										<img
											src={userSubmitButton}
											alt="submitBtn"
											style={{ width: 225, height: 60 }}
										/>
										<div className="absolute inset-0 flex items-center justify-center text-white font-MorabbaMedium text-2xl">
											ثبت سوال
										</div>
									</div>
								</button>
								{/* Constraint Text */}
								<div className="flex flex-row gap-5">
									<div
										className="text-white font-MorabbaMedium text-lg "
										dir="rtl"
									>
										{(50).toLocaleString("fa")} &nbsp; پاندا کوین
									</div>
									<div
										className="text-white font-MorabbaMedium text-lg font-bold "
										dir="rtl"
									>
										هزینه ثبت سوال
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

export default SubmitQuestion;
