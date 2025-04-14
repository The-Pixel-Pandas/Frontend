import React from "react";
import PropTypes from "prop-types";
import infoContainer from "../../../assets/images/infoContainer.png";

const ProfileInfoContainer = ({ text, amount }) => {
	return (
		<>
			<div className="relative">
				<img
					src={infoContainer}
					alt="infoContainer"
					style={{ width: 300, height: 150 }}
				/>
				<div className=" absolute inset-0 top-0 left-0">
					<div className=" flex flex-col  gap-5 text-nowrap justify-center items-center">
						<div className=" font-MorabbaMedium  text-white text-lg  mt-5">
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
