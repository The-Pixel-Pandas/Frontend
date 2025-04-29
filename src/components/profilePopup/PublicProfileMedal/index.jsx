import React from "react";
import PropTypes from "prop-types";
import { useMedalStore } from "../../../services";
import popupBox from "../../../assets/images/popupBox.png";

const PublicProfileMedal = ({ medalNumber }) => {
	const { getMedalByNumber } = useMedalStore();
	return (
		<>
			<div className="relative">
				<img
					src={popupBox}
					alt="popup box"
					style={{ width: 116, height: 80 }}
				/>
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center ">
					<img
						src={getMedalByNumber(medalNumber)}
						alt="medal"
						style={{ width: 45, height: 70 }}
					/>
				</div>
			</div>
		</>
	);
};

PublicProfileMedal.propTypes = {
	medalNumber: PropTypes.number,
};

export default PublicProfileMedal;
