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
				<div className="absolute left-0 top-0 w-full h-full flex flex-col justify-center items-start px-20 py-20 gap-6">
					<div className="flex flex-row gap-8 w-full">
						{/* Add Link */}
						<div className="flex flex-col items-center justify-start w-1/3">
							<img src={newsLink} alt="newsLink" className="w-full" />
							<button className="w-full h-16 flex items-center justify-center mt-[-60px]">
								افزودن لینک خبر
							</button>
						</div>
						<div className="flex flex-col gap-6 w-2/3">
							{/* News Title Input */}
							<div className="flex items-center w-full">
								<img src={newsTitle} alt="newTitle" className="absolute ml-2" />
								<input
									type="text"
									placeholder="خبر خود را وارد کنید ..."
									className="w-full h-16 rounded-xl bg-gradient-to-l from-[#2e3a6a] to-[#2e3a6a]/60 text-white pr-16"
									style={{ direction: "rtl" }}
								/>
							</div>
							{/* News Description */}
							<div className="flex items-center w-full">
								<img
									src={newsDescription}
									alt="newsDescription"
									className="absolute ml-2"
								/>
								<textarea
									placeholder="شرح خبر ..."
									className="w-full h-40 rounded-xl bg-gradient-to-l from-[#2e3a6a] to-[#2e3a6a]/60 text-white pr-16 pt-4"
									style={{ direction: "rtl" }}
								/>
							</div>
						</div>
					</div>
					{/* Bottom Row: Image Upload & Category/Submit */}
					<div className="flex flex-row gap-8 w-full mt-4">
						{/* Add Image */}
						<div className="flex flex-col items-center justify-start w-1/3">
							<img
								src={addPictureContainer}
								alt="addPictureContainer"
								className="w-full"
							/>
							<label className="w-full flex flex-col items-center justify-center mt-[-120px]">
								<img src={uploudLogo} alt="uploadLogo" className="mb-2" />
								<span className="text-cyan-300 text-lg">افزودن تصویر</span>
								<input type="file" className="hidden" />
							</label>
						</div>
						{/* Category Dropdown and Submit Button */}
						<div className="flex flex-col justify-end w-2/3">
							<div className="flex flex-col items-end gap-4 mt-8 w-full">
								<div className="flex items-center w-1/2 h-12 rounded-xl bg-gradient-to-l self-end">
									<img
										src={categoryDropDown}
										alt="categoryDropDown"
										className="ml-2"
									/>
									<select className="text-white bg-transparent w-1/2">
										<option>ورزشی</option>
										<option>سیاسی</option>
										<option>اقتصادی</option>
									</select>
									<span className="rounded-r-xl text-white text-lg mr-2">
										دسته بندی ها
									</span>
								</div>
								<div>
									<img src={submitButton} alt="submitButton" />
									<button className="w-1/2 h-10 rounded-xl bg-gradient-to-l">
										افزودن
									</button>
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
