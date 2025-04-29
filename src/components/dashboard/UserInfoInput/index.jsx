import React from "react";
import PropTypes from "prop-types";

const UserInfoInput = ({ text, type = "text" }) => {
	return (
		<>
			<div className="flex flex-col gap-0.5 mt-4 ml-72 ">
				<div className="text-white font-MorabbaMedium text-lg ml-28 mb-0.5">
					{text}
				</div>
				<div className="relative w-[200px] h-[50px]">
					<img
						src={inputUser}
						alt="inputUser"
						className="absolute inset-0 w-full h-full"
					/>
					<input
						type={type}
						dir="rtl"
						className="relative w-full h-full bg-transparent px-4 outline-none text-white placeholder-white/70 z-10"
					/>
				</div>
			</div>
		</>
	);
};

UserInfoInput.propTypes = {
	text: PropTypes.string.isRequired,
	type: PropTypes.string,
};

export default UserInfoInput;
