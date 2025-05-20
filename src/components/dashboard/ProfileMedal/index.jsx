import React from "react";
import PropTypes from "prop-types";
import { useMedalStore } from "../../../services";
import goldBox from "../../../assets/images/goldBox.png";
import bronzeBox from "../../../assets/images/bronzeBox.png";
import silverBox from "../../../assets/images/silverBox.png";

const ProfileMedal = ({ medalNumber, medalAmount }) => {
	const { getMedalByNumber } = useMedalStore();
	const medalBox = [goldBox, silverBox, bronzeBox];
	return (
		<div className="w-[300px] h-[136px] flex-shrink-0">
			{/* Medal Icons */}
			<div className="flex justify-center items-center">
				<img src={getMedalByNumber(medalNumber)} alt="goldMedal" />
			</div>
			{/* Medal Amount Box */}
			<div className="flex justify-center items-center mt-1">
				<div className="relative">
					<img
						src={medalBox[medalNumber - 1]}
						alt="goldBox"
						style={{ width: 135, height: 45 }}
					/>
					<div className="flex justify-center items-center absolute inset-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
						<div className="text-black/60 font-MorabbaBold text-2xl font-bold">
							{medalAmount.toLocaleString("fa")}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

ProfileMedal.propTypes = {
	medalNumber: PropTypes.number,
	medalAmount: PropTypes.number,
};

export default ProfileMedal;
