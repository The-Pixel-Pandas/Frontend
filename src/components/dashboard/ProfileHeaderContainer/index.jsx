import React from "react";
import PropTypes from "prop-types";
import infoContainer from "../../../assets/images/infoContainer.png";

const ProfileHeaderContainer = ({ text }) => {
	return (
		<div className="relative">
			<div>
				<img
					src={infoContainer}
					alt="infoContainer"
					style={{ width: 290, height: 150 }}
				/>
			</div>
			<div className="absolute inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-3 text-center w-[80%] max-h-[70%] overflow-y-auto">
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
