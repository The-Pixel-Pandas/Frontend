import React from "react";
import PropTypes from "prop-types";
import userInfoContainer from "../../../assets/images/userInfoContainer.png";

const ProfileHeaderContainer = ({ text }) => {
	return (
		<div className="relative overflow-hidden z-50">
			<div>
				<img
					src={userInfoContainer}
					alt="infoContainer"
					style={{ width: 290, height: 150 }}
				/>
			</div>
			<div className="absolute inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-3 text-center w-[80%] max-h-[70%] overflow-y-auto no-scrollbar">
				<div className="text-white font-MorabbaBold break-words whitespace-pre-wrap">
					{text}
				</div>
			</div>
		</div>
	);
};

ProfileHeaderContainer.propTypes = {
	text: PropTypes.string,
};

export default ProfileHeaderContainer;
