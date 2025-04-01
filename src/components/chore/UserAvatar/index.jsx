import React from "react";
import PropTypes from "prop-types";
import { useAvatarStore } from "../../../services";

const UserAvatar = ({ width = 70, height = 65 }) => {
	const { getAvatarSrc } = useAvatarStore();

	return (
		<>
			<img
				src={getAvatarSrc()}
				alt="userAvatar"
				style={{ width, height }}
				className="rounded-full"
			/>
		</>
	);
};

UserAvatar.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number,
};

export default UserAvatar;
