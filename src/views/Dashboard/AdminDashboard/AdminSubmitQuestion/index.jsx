import React, { useState, useEffect, useRef } from "react";
import { Toast } from "../../../../components";
import { useFormik } from "formik";
import {
	userSubmitQuestionYup,
	useCoinStore,
	httpService,
} from "../../../../services";
import { useCoinChooser, useToast, useImageConverter } from "../../../../hooks";

import addQuestionContainer from "../../../../assets/images/adminContainer.png";
import addQuestionPictureContainer from "../../../../assets/images/addQuestionPictureContainer.png";
import addQuestionCoinContainer from "../../../../assets/images/addQuestionCoinContainer.png";
import submitButton from "../../../../assets/images/submitButton.png";
import categoryDropDown from "../../../../assets/images/categoryDropDown.png";
import adminQuestionTitle from "../../../../assets/images/adminQuestionTitle.png";
import adminQuestionDescription from "../../../../assets/images/adminQuestionDescription.png";
import adminCoinIncrease from "../../../../assets/images/adminCoinIncrease.png";
import adminCoinDecrease from "../../../../assets/images/adminCoinDecrease.png";
import coinLogoAdmin from "../../../../assets/images/coinLogoAdmin.png";

const AdminSubmitQuestion = () => {
	const { coin, increaseCoin, decreaseCoin } = useCoinChooser(0, 50);

	const categories = [
		"همه موارد",
		"ورزشی",
		"سیاسی",
		"اجتماعی",
		"اقتصادی",
		"رمز ارز",
		"موسیقی",
	];
	const [selectedCategory, setSelectedCategory] = useState("همه موارد");
	return (
		<div className="absolute left-0 top-0 flex items-center z-0 ml-14">
			<div className="relative">
				<img
					src={addQuestionContainer}
					alt="addQuestionContainer"
					style={{ width: 1100, height: 600 }}
					className="mt-10"
				/>
				<div className="absolute left-0 top-0 w-full h-full flex flex-col justify-center items-start ml-20 -mt-5 ">
					<div className="flex flex-row gap-28 w-full">
						{/* Add Link */}
						<div className="flex flex-col items-center justify-start w-1/3 mt-2">
							<div className="relative">
								<img
									src={addQuestionPictureContainer}
									alt="addQuestionPictureContainer"
									style={{ width: 450, height: 80 }}
								/>
								<button className=" absolute inset-0 w-full flex items-center  justify-center ">
									<div className="bg-clip-text text-transparent  bg-gradient-to-r from-[#315EC9] to-[#34A2B3] font-MorabbaMedium text-lg">
										افزودن تصویر
									</div>
								</button>
							</div>
						</div>
						<div className="flex flex-col gap-9 z-50">
							{/* News Title Input */}
							<div className="flex items-center w-full">
								<div className="relative">
									<img
										src={adminQuestionTitle}
										alt="adminQuestionTitle"
										style={{ width: 460, height: 110 }}
									/>
									<textarea
										placeholder="عنوان سوال خود را وارد کنید ..."
										className="absolute inset-0  h-full w-full  bg-transparent text-white text-lg font-MorabbaMedium placeholder:font-MorabbaMedium pr-10 pt-5 pl-10 border-none outline-none overflow-y-scroll no-scrollbar max-h-[100px] resize-none"
										style={{ direction: "rtl" }}
									/>
								</div>
							</div>
							{/* News Description */}
							<div className="flex items-center z-50 ">
								<div className="relative">
									<img
										src={adminQuestionDescription}
										alt="adminQuestionDescription"
										style={{ width: 460, height: 235 }}
									/>
									<textarea
										placeholder="توضیحات ..."
										className="absolute inset-0  h-full w-full  bg-transparent text-white text-lg font-MorabbaMedium placeholder:font-MorabbaMedium pr-10 pt-5 pl-10  border-none outline-none overflow-y-scroll no-scrollbar max-h-[280px] resize-none"
										style={{ direction: "rtl" }}
									/>
								</div>
							</div>
						</div>
					</div>
					{/* Bottom Row: Image Upload & Category/Submit */}
					<div className="flex flex-row justify-center w-full absolute inset-0 mt-64 ">
						{/* Add Image */}
						<div className="flex flex-col items-center  w-1/3 gap-10">
							<div className="relative">
								<img
									src={addQuestionCoinContainer}
									alt="addQuestionCoinContainer"
									style={{ width: 538, height: 297 }}
								/>
								<label className="absolute inset-0 w-full flex flex-col items-center ">
									<img
										src={coinLogoAdmin}
										alt="coinLogoAdmin"
										className="mb-2"
										style={{ width: 200, height: 200 }}
									/>

									<div className="flex flex-row ">
										<button
											type="button"
											onClick={decreaseCoin}
											className="text-white font-MorabbaRegular text-lg focus:outline-none hover:opacity-85 hover:scale-105 transition-all duration-300 px-12"
										>
											<img
												src={adminCoinDecrease}
												alt="adminCoinDecrease"
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
										</div>
										<button
											type="button"
											onClick={increaseCoin}
											className="text-white font-MorabbaRegular text-lg focus:outline-none hover:opacity-85 hover:scale-105 transition-all duration-300 px-12"
										>
											<img
												src={adminCoinIncrease}
												alt="adminCoinIncrease"
												style={{ width: 60, height: 60 }}
											/>
										</button>
									</div>
									<input type="file" className="hidden" />
								</label>
							</div>
							<div className="flex items-center mr-40 ">
								<div className="relative">
									<img
										src={submitButton}
										alt="submitButton"
										style={{ width: 273, height: 48 }}
									/>
									<button className=" absolute inset-0  ">
										<div className="text-white text-2xl font-MorabbaMedium">
											افزودن
										</div>
									</button>
								</div>
							</div>
						</div>
						{/* Category Dropdown and Submit Button */}
						<div className="flex flex-col w-2/3 items-center justify-center   ">
							<div className="flex flex-col items-end gap-4 w-full mr-96 pr-5 mt-52">
								<div className="flex items-center w-1/2 h-12 rounded-xl bg-gradient-to-l self-end">
									<div className="relative">
										<img
											src={categoryDropDown}
											alt="categoryDropDown"
											className="ml-2"
										/>
										<div className="absolute inset-0 w-full flex items-center justify-center">
											<select
												className="text-white w-1/2 outline-none border-none font-MorabbaMedium bg-transparent"
												value={selectedCategory}
												onChange={(e) => setSelectedCategory(e.target.value)}
											>
												{categories.map((category) => (
													<option
														key={category}
														style={{
															background: "#1F3B73",
															color: "white",
															fontWeight: "bold",
														}}
													>
														{category}
													</option>
												))}
											</select>

											<div className="rounded-r-xl text-white text-lg mr-2 font-MorabbaMedium">
												دسته بندی ها
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminSubmitQuestion;
