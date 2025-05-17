import React from "react";
import PropTypes from "prop-types";
import { useProfileStore } from "../../../services";
import userInfoContainer from "../../../assets/images/userInfoContainer.png";
import adminInfoContainer from "../../../assets/images/adminInfoContainer.png";

const ProfileInfoContainer = ({ text, amount }) => {
	const { isAdmin } = useProfileStore.getState();
	return (
		<>
			<div className="relative">
				<img
					src={isAdmin ? adminInfoContainer : userInfoContainer}
					alt="infoContainer"
					style={{ width: 260, height: 150 }}
				/>
				<div className=" absolute inset-0 top-0 left-0">
					<div className=" flex flex-col gap-10 text-nowrap justify-center items-center">
						<div className=" font-MorabbaMedium  text-white text-lg mt-5">
							{text}
						</div>
						<div className=" font-MorabbaMedium text-white text-lg  ">
							{" "}
							{amount.toLocaleString("fa")}{" "}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

ProfileInfoContainer.propTypes = {
	text: PropTypes.string,
	amount: PropTypes.number,
};

export default ProfileInfoContainer;
