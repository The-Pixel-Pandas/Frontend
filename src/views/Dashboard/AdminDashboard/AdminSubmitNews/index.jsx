import React from "react";
import addNewsContainer from "../../../../assets/images/adminContainer.png";
import newsLink from "../../../../assets/images/newsLink.png";
import addPictureContainer from "../../../../assets/images/addPictureContainer.png";
import uploudLogo from "../../../../assets/images/uploudLogo.png";
import submitButton from "../../../../assets/images/submitButton.png";
import categoryDropDown from "../../../../assets/images/categoryDropDown.png";
import newsTitle from "../../../../assets/images/newsTitle.png";
import newsDescription from "../../../../assets/images/newsDescription.png";

const AdminSubmitNews = () => {
	return (
		<div className="absolute left-0 top-0 flex items-center z-0 ml-14">
			<div className="relative">
				<img
					src={addNewsContainer}
					alt="addNewsContainer"
					style={{ width: 1100, height: 600 }}
					className="mt-10"
				/>
				<div className="absolute left-0 top-0 w-full h-full flex flex-col justify-center items-start ml-20 -mt-5 ">
					<div className="flex flex-row gap-28 w-full">
						{/* Add Link */}
						<div className="flex flex-col items-center justify-start w-1/3 mt-2">
							<div className="relative">
								<img
									src={newsLink}
									alt="newsLink"
									style={{ width: 450, height: 80 }}
								/>
								<button className=" absolute inset-0 w-full flex items-center  justify-center ">
									<div className="bg-clip-text text-transparent  bg-gradient-to-r from-[#315EC9] to-[#34A2B3] font-MorabbaMedium text-lg">
										افزودن لینک خبر
									</div>
								</button>
							</div>
						</div>
						<div className="flex flex-col gap-9">
							{/* News Title Input */}
							<div className="flex items-center w-full">
								<div className="relative">
									<img
										src={newsTitle}
										alt="newTitle"
										style={{ width: 460, height: 110 }}
									/>
									<textarea
										placeholder="خبر خود را وارد کنید ..."
										className="absolute inset-0  h-full w-full  bg-transparent text-white text-lg font-MorabbaMedium placeholder:font-MorabbaMedium pr-10 pt-5 pl-10 border-none outline-none overflow-y-scroll no-scrollbar max-h-[100px] resize-none"
										style={{ direction: "rtl" }}
									/>
								</div>
							</div>
							{/* News Description */}
							<div className="flex items-center ">
								<div className="relative">
									<img
										src={newsDescription}
										alt="newsDescription"
										style={{ width: 460, height: 235 }}
									/>
									<textarea
										placeholder="شرح خبر ..."
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
									src={addPictureContainer}
									alt="addPictureContainer"
									style={{ width: 538, height: 297 }}
								/>
								<label className="absolute inset-0 w-full flex flex-col items-center justify-center ">
									<img
										src={uploudLogo}
										alt="uploadLogo"
										className="mb-2"
										style={{ width: 150, height: 150 }}
									/>
									<span className="bg-clip-text text-transparent  bg-gradient-to-r from-[#315EC9] to-[#34A2B3] font-MorabbaMedium text-xl">
										افزودن &nbsp; تصویر
									</span>
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
											<select className="text-white w-1/2 outline-none border-none font-MorabbaMedium bg-transparent">
												<option
													style={{
														background: "#1F3B73",
														color: "white",
														fontWeight: "bold",
													}}
												>
													ورزشی
												</option>
												<option
													style={{
														background: "#1F3B73",
														color: "white",
														fontWeight: "bold",
													}}
												>
													سیاسی
												</option>
												<option
													style={{
														backgroundColor: "#1F3B73",
														color: "white",
														fontWeight: "bold",
													}}
												>
													اقتصادی
												</option>
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

export default AdminSubmitNews;
