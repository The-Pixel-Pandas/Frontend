import React, { useState } from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import { Toast } from "../../../components";
import { useToast } from "../../../hooks";
import {
	userSubmitQuestionYup,
	userSubmitNewsYup,
	httpService,
} from "../../../services";
import adminContainer from "../../../assets/images/adminContainer.png";
import taskTitle from "../../../assets/images/newsTitle.png";
import taskDescription from "../../../assets/images/newsDescription.png";
import uploadImageBox from "../../../assets/images/newsLink.png";
import submitButton from "../../../assets/images/submitButton.png";
import categoryDropDown from "../../../assets/images/categoryDropDown.png";
import addPictureContainer from "../../../assets/images/addPictureContainer.png";
import uploudLogo from "../../../assets/images/uploudLogo.png";

const SubmitView = ({ type }) => {
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
	const [selectedImage, setSelectedImage] = useState(null);
	const { toastMessage, isSubmitted, isError, showToast } = useToast();

	const handleSubmitAPI = async (values) => {
		// Prepare data for submission
		const data =
			type === "question"
				? {
						question_description: values.description,
						question_topic: values.question,
						question_type: selectedCategory,
						question_tag: values.tag,
						image_base64: selectedImage,
					}
				: {
						news_description: values.news_description,
						news_topic: values.news,
						news_type: selectedCategory,
						news_tag: values.news_tag,
						image_base64: selectedImage,
					};

		// Submit the question
		httpService
			.post(type === "question" ? "questions/" : "news/", data)
			.then((res) => {
				setSelectedImage(null);
				formik.resetForm();
				setSelectedCategory("همه موارد");
				console.log("Submit API:", res);
				showToast(
					type === "question"
						? "سوال با موفقیت ثبت شد"
						: "خبر با موفقیت ثبت شد",
					false
				);
			})
			.catch((err) => {
				console.log("Submit API Error:", err);
				showToast(
					type === "question" ? "خطا در ارسال سوال" : "خطا در ارسال خبر",
					true
				);
			});
	};

	const formik = useFormik({
		initialValues:
			type === "question"
				? userSubmitQuestionYup.initialValues
				: userSubmitNewsYup.initialValues,
		validationSchema:
			type === "question"
				? userSubmitQuestionYup.validationSchema
				: userSubmitNewsYup.validationSchema,
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

	return (
		<>
			<form
				id={
					type === "question"
						? "adminSubmitQuestionForm"
						: "adminSubmitNewsForm"
				}
				onSubmit={formik.handleSubmit}
			>
				<div className="absolute left-0 top-0 flex items-center z-0 ml-14 mt-10">
					<div className="relative">
						{/* BackGround Image */}
						<img
							src={adminContainer}
							alt="adminContainer"
							style={{ width: 1100, height: 600 }}
						/>
						{/* Right Section */}
						<div className="absolute inset-0 z-50 flex items-center justify-center flex-col gap-5 ml-[480px] mb-5">
							<div className="relative">
								<img
									src={taskTitle}
									alt="taskTitle"
									style={{ width: 460, height: 100 }}
								/>
								<textarea
									placeholder={
										type === "question" ? "عنوان سوال ..." : "عنوان خبر ..."
									}
									className="absolute inset-0  h-full w-full  bg-transparent text-white text-lg font-MorabbaMedium placeholder:font-MorabbaMedium pr-10 pt-5 pl-10 border-none outline-none overflow-y-scroll no-scrollbar max-h-[100px] resize-none z-50"
									style={{ direction: "rtl" }}
									{...formik.getFieldProps(
										type === "question" ? "question" : "news"
									)}
									onChange={formik.handleChange}
								/>
								{formik.errors[type === "question" ? "question" : "news"] &&
									formik.touched[type === "question" ? "question" : "news"] && (
										<div className="absolute top-0 left-0 w-full h-full flex items-center justify-center font-MorabbaSemiBold text-red-800 text-lg mt-5 ">
											{formik.errors[type === "question" ? "question" : "news"]}
										</div>
									)}
							</div>
							<div className="relative">
								<img
									src={taskDescription}
									alt="taskDescription"
									style={{ width: 460, height: 250 }}
								/>
								<textarea
									placeholder={
										type === "question" ? "شرح سوال ..." : "شرح خبر ..."
									}
									className="absolute inset-0  h-full w-full  bg-transparent text-white text-lg font-MorabbaMedium placeholder:font-MorabbaMedium pr-10 pt-5 pl-10  border-none outline-none overflow-y-scroll no-scrollbar max-h-[280px] resize-none z-50"
									style={{ direction: "rtl" }}
									{...formik.getFieldProps(
										type === "question" ? "description" : "news_description"
									)}
									onChange={formik.handleChange}
								/>
								{formik.errors[
									type === "question" ? "description" : "news_description"
								] &&
									formik.touched[
										type === "question" ? "description" : "news_description"
									] && (
										<div className="absolute top-0 left-0 w-full h-full flex items-center justify-center font-MorabbaSemiBold text-red-800 text-lg mt-[45px] ">
											{
												formik.errors[
													type === "question"
														? "description"
														: "news_description"
												]
											}
										</div>
									)}
							</div>
							{/* Category Dropdown and Submit Button */}
							<div className="relative">
								<img
									src={categoryDropDown}
									alt="categoryDropDown"
									className="ml-2"
									style={{ width: 450, height: 48 }}
								/>
								<div className="absolute inset-0 w-full flex items-center justify-center">
									<select
										className="text-white w-1/2 outline-none border-none font-MorabbaMedium bg-transparent "
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

						{/* Left Section */}
						<div className="  absolute inset-0 z-50 flex items-center justify-center flex-col gap-10 mr-[580px] mb-5">
							{/* Tag Input */}
							<div className="relative z-50">
								<img
									src={uploadImageBox}
									alt="uploadImageBox"
									style={{ width: 390, height: 100 }}
									className="z-10 "
								/>

								<label className="absolute inset-0 w-full flex flex-row items-center justify-center ">
									<div className=" absolute top-2 right-10  bg-clip-text text-transparent  bg-gradient-to-r from-[#315EC9] to-[#34A2B3] font-MorabbaMedium text-2xl ">
										افزودن &nbsp; تگ
									</div>
									<input
										type="text"
										className="absolute inset-0 w-full flex flex-row items-center justify-center z-50 bg-transparent text-white text-lg font-MorabbaMedium placeholder:font-MorabbaMedium pr-10 pt-5 pl-10 border-none outline-none overflow-y-scroll no-scrollbar max-h-[100px] resize-none"
										dir="rtl"
										{...formik.getFieldProps(
											type === "question" ? "tag" : "news_tag"
										)}
										onChange={formik.handleChange}
									/>
									{formik.errors[type === "question" ? "tag" : "news_tag"] &&
										formik.touched[
											type === "question" ? "tag" : "news_tag"
										] && (
											<div className="absolute inset-0 mt-2 w-full h-full flex items-center justify-center font-MorabbaSemiBold text-red-800 text-lg z-50 ">
												{
													formik.errors[
														type === "question" ? "tag" : "news_tag"
													]
												}
											</div>
										)}
								</label>
							</div>
							{/* Upload Image */}
							<div className="relative">
								<img
									src={addPictureContainer}
									alt="addPictureContainer"
									style={{ width: 410, height: 297 }}
								/>
								{selectedImage ? (
									<div
										className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  z-50 transition duration-300 ease-in-out hover:scale-125"
										style={{ width: 180, height: 180 }}
									>
										<img
											src={selectedImage}
											alt="selectedImage"
											className="w-full h-full"
										/>
									</div>
								) : (
									<label className="absolute inset-0 w-full flex flex-col items-center justify-center ">
										<img
											src={uploudLogo}
											alt="uploadLogo"
											className="mb-2"
											style={{ width: 150, height: 150 }}
										/>
										<span className="bg-clip-text text-transparent  bg-gradient-to-r from-[#315EC9] to-[#34A2B3] font-MorabbaMedium text-3xl">
											افزودن &nbsp; تصویر
										</span>
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
							<div className="absolute left-0 bottom-0 ml-15 z-50">
								<button
									type="submit"
									className="focus:outline-none hover:opacity-85 hover:scale-105 transition-all duration-300"
								>
									<div className="relative">
										<img
											src={submitButton}
											alt="submitBtn"
											style={{ width: 210, height: 45 }}
										/>
										<div className="absolute inset-0 flex items-center justify-center text-white font-MorabbaMedium text-2xl">
											{type === "question" ? "ثبت سوال" : "ثبت خبر"}
										</div>
									</div>
								</button>
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

SubmitView.propTypes = {
	type: PropTypes.string.isRequired,
};

export default SubmitView;
