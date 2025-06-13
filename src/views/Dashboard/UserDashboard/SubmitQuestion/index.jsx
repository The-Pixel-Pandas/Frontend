import React, { useState } from "react";
import { Toast } from "../../../../components";
import { useFormik } from "formik";
import { userSubmitQuestionYup, httpService } from "../../../../services";
import { useToast } from "../../../../hooks";
import userDashboardBackground from "../../../../assets/images/userDashboardBackground.png";
import userSubmitBox from "../../../../assets/images/userSubmitBox.png";
import userSubmitTitle from "../../../../assets/images/userSubmitTitle.png";
import userSubmitDescription from "../../../../assets/images/userSubmitDescription.png";
import userSubmitCategoryContainer from "../../../../assets/images/userSubmitCategoryContainer.png";
import userSubmitUploadBox from "../../../../assets/images/userSubmitUploadBox.png";
import userSubmitUploadIcon from "../../../../assets/images/userSubmitUploadIcon.png";
import userSubmitButton from "../../../../assets/images/userSubmitButton.png";
import tagBox from "../../../../assets/images/tagBox.png";

const SubmitQuestion = () => {
	const [selectedCategory, setSelectedCategory] = useState("همه موارد");
	const [selectedImage, setSelectedImage] = useState(null);
	const { toastMessage, isSubmitted, isError, showToast } = useToast();

	const handleSubmitAPI = async (values) => {
		// Prepare data for submission
		const data = {
			question_description: values.description,
			question_topic: values.question,
			question_type: selectedCategory,
			question_tag: values.tag,
			image_base64: selectedImage,
		};

		// Submit the question
		httpService
			.post("questions/", data)
			.then(() => {
				console.log("Question Submit API Response:", data);
				setSelectedImage(null);
				formik.resetForm();
				setSelectedCategory("همه موارد");
				showToast("سوال با موفقیت ثبت شد", false);
			})
			.catch((error) => {
				showToast("خطا در ارسال سوال", true);
				console.error("Error submitting question:", error);
			});
	};

	const formik = useFormik({
		initialValues: userSubmitQuestionYup.initialValues,
		validationSchema: userSubmitQuestionYup.validationSchema,
		validateOnChange: true,
		validateOnBlur: true,
		onSubmit: (values) => {
			if (selectedImage == null) {
				showToast("لطفا تصویری اپلود کنید", true);
				return;
			}
			if (!selectedCategory) {
				showToast("لطفا دسته بندی مورد نظر خود را انتخاب کنید", true);
				return;
			}
			handleSubmitAPI(values);
		},
	});

	const categories = [
		"همه موارد",
		"ورزشی",
		"سیاسی",
		"اجتماعی",
		"اقتصادی",
		"رمز ارز",
		"موسیقی",
	];
	return (
		<>
			<form id="submitQuestionForm" onSubmit={formik.handleSubmit}>
				<div className="absolute left-0 top-0 flex items-center z-0 ml-14 mt-10">
					<div className="relative">
						{/* BackGround Image */}
						<img
							src={userDashboardBackground}
							alt="dashboardContainer"
							style={{ width: 1100, height: 600 }}
						/>
						{/* Right Section */}
						<div className="absolute inset-0 z-50 flex items-center justify-center ml-[430px] mb-8">
							<div className="relative">
								<img
									src={userSubmitBox}
									alt="userSubmitBox"
									style={{ width: 573, height: 500 }}
								/>
								<div className="absolute inset-0 z-50 flex items-center flex-col gap-3 mt-7">
									{/* Title Box */}
									<div className="relative">
										<img
											src={userSubmitTitle}
											alt="userSubmitTitle"
											style={{ width: 503, height: 100 }}
										/>
										<textarea
											placeholder="سوال :"
											className={`absolute inset-0  h-full w-full z-50 bg-transparent text-white text-xl font-MorabbaMedium placeholder:font-MorabbaMedium placeholder:text-white placeholder:text-2xl pr-10 pt-5 pl-10 border-none outline-none overflow-y-scroll no-scrollbar max-h-[100px] resize-none`}
											{...formik.getFieldProps("question")}
											onChange={formik.handleChange}
											style={{ direction: "rtl" }}
										/>
										{formik.errors.question && formik.touched.question && (
											<div className="absolute top-0 left-0 w-full h-full flex items-center justify-center font-MorabbaMedium text-red-500 text-lg">
												{formik.errors.question}
											</div>
										)}
									</div>
									{/* Description Box */}
									<div className="relative mt-10">
										<img
											src={userSubmitDescription}
											alt="userSubmitDescription"
											style={{ width: 503, height: 240 }}
										/>
										<textarea
											placeholder="توضیحات :"
											className={`absolute inset-0  h-full w-full z-50 bg-transparent text-white text-xl font-MorabbaMedium placeholder:font-MorabbaMedium placeholder:text-white placeholder:text-2xl pr-10 pt-5 pl-10 border-none outline-none overflow-y-scroll no-scrollbar max-h-[200px] resize-none`}
											style={{ direction: "rtl" }}
											{...formik.getFieldProps("description")}
											onChange={formik.handleChange}
										/>
										{formik.touched.description &&
											formik.errors.description && (
												<div className="absolute top-0 left-0 w-full h-full flex items-center justify-center font-MorabbaMedium text-red-500 text-lg">
													{formik.errors.description}
												</div>
											)}
									</div>
									{/* Category Box */}
									<div className="relative ">
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
								</div>
							</div>
						</div>
						{/* Left Section */}
						<div className="absolute inset-0 z-50 flex flex-col items-center mt-8 mr-[650px]">
							<div className="absolute inset-0 z-50 flex items-center flex-col gap-7 mt-7">
								{/* Tag Box */}
								<div className="relative">
									<img
										src={tagBox}
										alt="tagBox"
										style={{ width: 350, height: 100 }}
									/>
									<textarea
										placeholder="تگ :"
										className={`absolute inset-0  h-full w-full z-50 bg-transparent text-white text-xl font-MorabbaMedium placeholder:font-MorabbaMedium placeholder:text-white placeholder:text-2xl pr-10 pt-5 pl-10 border-none outline-none overflow-y-scroll no-scrollbar max-h-[100px] resize-none`}
										{...formik.getFieldProps("tag")}
										onChange={formik.handleChange}
										style={{ direction: "rtl" }}
									/>
									{formik.errors.tag && formik.touched.tag && (
										<div className="absolute top-0 left-0 w-full h-full flex items-center justify-center font-MorabbaMedium text-red-500 text-lg">
											{formik.errors.tag}
										</div>
									)}
								</div>
								{/* Upload Box */}
								<div className="relative mt-5">
									<img
										src={userSubmitUploadBox}
										alt="userSubmitUploadBox"
										style={{ width: 350, height: 260 }}
										className="z-10"
									/>
									{selectedImage ? (
										// Selected Image
										<div
											className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition duration-300 ease-in-out hover:scale-110"
											style={{ width: 180, height: 180 }}
										>
											<img
												src={selectedImage}
												alt="selectedImage"
												className="w-full h-full"
											/>
										</div>
									) : (
										// Upload Input
										<label className="absolute inset-0 w-full flex flex-col items-center justify-center ">
											<img
												src={userSubmitUploadIcon}
												alt="userSubmitUploadIcon"
												style={{ width: 100, height: 100 }}
											/>
											<div className=" ml-1 text-white text-3xl font-MorabbaMedium">
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
								{/* Submit Button */}
								<div className="flex flex-col gap-1 mr-24">
									<button
										type="submit"
										className="focus:outline-none hover:opacity-85 hover:scale-105 transition-all duration-300"
									>
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

export default SubmitQuestion;
