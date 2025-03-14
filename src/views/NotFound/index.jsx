import React from "react";
import notFoundAnim from "../../assets/animations/notFoundAnim.json";
import LottieAnim from "../../components/LottieAnim";

const NotFound = () => {
	return (
		<>
			<div className="flex justify-center items-center flex-col min-h-screen pb-20">
				<div className="w-[500px] max-w-full px-4">
					<LottieAnim lottieJson={notFoundAnim} width="100%" height="100%" />
				</div>
				<h1 className="text-2xl md:text-5xl font-bold text-white drop-shadow-lg tracking-wide text-center px-4">صفحه مورد نظر یافت نشد</h1>
			</div>
		</>
	);
};

export default NotFound;
