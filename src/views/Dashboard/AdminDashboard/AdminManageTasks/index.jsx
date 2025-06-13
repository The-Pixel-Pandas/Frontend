import React, { useState, useRef, useEffect } from "react";
import { useFormik } from "formik";
import { AnimateCoinLogo, Toast } from "../../../../components";
import { useCoinChooser, useToast } from "../../../../hooks";
import { adminSubmitTaskYup, httpService } from "../../../../services";
import addCoinContainer from "../../../../assets/images/addPictureContainer.png";
import adminContainer from "../../../../assets/images/adminContainer.png";
import taskTitle from "../../../../assets/images/newsTitle.png";
import taskDescription from "../../../../assets/images/newsDescription.png";
import uploadImageBox from "../../../../assets/images/newsLink.png";
import adminIncreaseBtn from "../../../../assets/images/adminIncreaseBtn.png";
import adminDecreaseBtn from "../../../../assets/images/adminDecreaseBtn.png";
import submitButton from "../../../../assets/images/submitButton.png";

const AdminManageTasks = () => {
	const [selectedImage, setSelectedImage] = useState(null);
	const { coin, increaseCoin, decreaseCoin } = useCoinChooser(0);
	const { toastMessage, isSubmitted, isError, showToast } = useToast();
	const previousCoinRef = useRef(0);

	const handleSubmitAPI = (values) => {
		const data = {
			task_topic: values.title,
			task_description: values.description,
			task_tag: values.link,
			amount: coin,
			image_base64: selectedImage,
		};

		httpService
			.post("tasks/", data)
			.then(() => {
				console.log("Add Task API Response:", data);
				showToast("تسک با موفقیت اضافه شد", false);
				setSelectedImage(null);
				formik.resetForm();
			})
			.catch((error) => {
				console.log("Add Task API Error:", error);
				showToast("خطا در اضافه کردن تسک", true);
			});
	};

	const formik = useFormik({
		initialValues: adminSubmitTaskYup.initialValues,
		validationSchema: adminSubmitTaskYup.validationSchema,
		validateOnChange: true,
		validateOnBlur: true,
		onSubmit: (values) => {
			if (selectedImage == null) {
				showToast("لطفا تصویری اپلود کنید", true);
				return;
			}
			handleSubmitAPI(values);
		},
	});

	useEffect(() => {
		if (previousCoinRef.current !== coin) {
			previousCoinRef.current = coin;
			formik.setFieldValue("coin", coin);
		}
	}, [coin]);

	return (
		<>
			<form id="adminSubmitTaskForm" onSubmit={formik.handleSubmit}>
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
									style={{ width: 460, height: 90 }}
								/>
								<textarea
									placeholder="عنوان تسک ..."
									className="absolute inset-0  h-full w-full  bg-transparent text-white text-lg font-MorabbaMedium placeholder:font-MorabbaMedium pr-10 pt-5 pl-10 border-none outline-none overflow-y-scroll no-scrollbar max-h-[90px] resize-none z-50"
									style={{ direction: "rtl" }}
									{...formik.getFieldProps("title")}
									onChange={formik.handleChange}
								/>
								{formik.errors.title && formik.touched.title && (
									<div className="absolute top-0 left-0 w-full h-full flex items-center justify-center font-MorabbaSemiBold text-red-800 text-lg mt-5 ">
										{formik.errors.title}
									</div>
								)}
							</div>
							<div className="relative">
								<img
									src={taskDescription}
									alt="taskDescription"
									style={{ width: 460, height: 210 }}
								/>
								<textarea
									placeholder="شرح تسک ..."
									className="absolute inset-0  h-full w-full  bg-transparent text-white text-lg font-MorabbaMedium placeholder:font-MorabbaMedium pr-10 pt-5 pl-10  border-none outline-none overflow-y-scroll no-scrollbar max-h-[210px] resize-none z-50"
									style={{ direction: "rtl" }}
									{...formik.getFieldProps("description")}
									onChange={formik.handleChange}
								/>
								{formik.errors.description && formik.touched.description && (
									<div className="absolute top-0 left-0 w-full h-full flex items-center justify-center font-MorabbaSemiBold text-red-800 text-lg mt-[45px] ">
										{formik.errors.description}
									</div>
								)}
							</div>
							<div className="relative">
								<img
									src={uploadImageBox}
									alt="taskTitle"
									style={{ width: 460, height: 90 }}
								/>
								<textarea
									placeholder="لینک انجام تسک ..."
									className="absolute inset-0  h-full w-full  bg-transparent text-white text-lg font-MorabbaMedium placeholder:font-MorabbaMedium pr-10 pt-5 pl-10 border-none outline-none overflow-y-scroll no-scrollbar max-h-[90px] resize-none z-50 placeholder:bg-clip-text placeholder:text-transparent placeholder:bg-gradient-to-r placeholder:from-[#315EC9] placeholder:to-[#34A2B3]  "
									style={{ direction: "rtl" }}
									{...formik.getFieldProps("link")}
									onChange={formik.handleChange}
								/>
								{formik.errors.link && formik.touched.link && (
									<div className="absolute top-0 left-0 w-full h-full flex items-center justify-center font-MorabbaSemiBold text-red-800 text-lg mt-5 ">
										{formik.errors.link}
									</div>
								)}
							</div>
						</div>

						{/* Left Section */}
						<div className="  absolute inset-0 z-50 flex items-center justify-center flex-col gap-10 mr-[580px] mb-5">
							{/* Upload Image */}
							<div className="relative z-50">
								<img
									src={uploadImageBox}
									alt="uploadImageBox"
									style={{ width: 390, height: 100 }}
									className="z-10 "
								/>
								{selectedImage ? (
									// Selected Image
									<div
										className="absolute inset-0 ml-[148px] mt-1  pt-3 pb-3 pl-3 pr-3  z-50 flex items-center justify-center transition duration-300 ease-in-out hover:scale-125"
										style={{ width: 90, height: 90 }}
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
										<div className=" ml-1  bg-clip-text text-transparent  bg-gradient-to-r from-[#315EC9] to-[#34A2B3] font-MorabbaMedium text-3xl ">
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
							{/* Add Coin */}
							<div className="relative">
								<img
									src={addCoinContainer}
									alt="addCoinContainer"
									style={{ width: 390, height: 285 }}
								/>

								<div className="absolute inset-0 flex items-center justify-center ml-5 -mt-28">
									<AnimateCoinLogo isShiny={true} width={296} height={286} />
								</div>
								<div className="absolute inset-0 flex flex-row items-center justify-center gap-10 mt-48 z-50">
									<button
										type="button"
										onClick={decreaseCoin}
										className="text-white font-MorabbaRegular text-lg focus:outline-none hover:opacity-85 hover:scale-105 transition-all duration-300"
									>
										<img
											src={adminDecreaseBtn}
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
									</div>
									<button
										type="button"
										onClick={increaseCoin}
										className="text-white font-MorabbaRegular text-lg focus:outline-none hover:opacity-85 hover:scale-105 transition-all duration-300"
									>
										<img
											src={adminIncreaseBtn}
											alt="coinFuncButton"
											style={{ width: 60, height: 60 }}
										/>
									</button>
								</div>
								<div className="absolute inset-0 flex items-center justify-center mt-14">
									<div
										className={`font-MorabbaMedium ${formik.errors.coin ? "text-red-800 text-lg" : "text-white text-lg"} text-nowrap`}
									>
										{formik.errors.coin
											? formik.errors.coin
											: "مقدار پاداش خود را تعیین کنید"}
									</div>
								</div>
							</div>
						</div>
						{/* Submit Button */}
						<div className="absolute left-0 bottom-0 ml-15 mb-5 z-50">
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
										ثبت تسک
									</div>
								</div>
							</button>
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

export default AdminManageTasks;
