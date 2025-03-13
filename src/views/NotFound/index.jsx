import React from "react";
import notFoundAnim from "../../assets/animations/notFoundAnim.json";
import LottieAnim from "../../components/LottieAnim";

const NotFound = () => {
	return (
		<>
			<div className="flex justify-center items-center flex-col">
				<LottieAnim lottieJson={notFoundAnim} width={500} height={500} />
                <h1 className="text-4xl font-bold text-white drop-shadow-lg tracking-wide">صفحه مورد نظر یافت نشد</h1>
			</div>
		</>
	);
};

export default NotFound;
