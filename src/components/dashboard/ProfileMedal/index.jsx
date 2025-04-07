import React from "react";
import PropTypes from "prop-types";
import { useMedalStore } from "../../../services";
import medalContainer from "../../../assets/images/medalContainer.png";
import goldBox from "../../../assets/images/goldBox.png";
import bronzeBox from "../../../assets/images/bronzeBox.png";
import silverBox from "../../../assets/images/silverBox.png";

const ProfileMedal = ({ medalNumber, medalAmount }) => {
	const { getMedalByNumber } = useMedalStore();
	const medalBox = [goldBox, silverBox, bronzeBox];
	return (
		<>
			<div className="">
				<div className="relative flex justify-center items-center ">
					<img src={medalContainer} alt="medalContainer" />
					<div className="flex justify-center items-center absolute inset-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
						<img src={getMedalByNumber(medalNumber)} alt="goldMedal" />
					</div>
					<div className="flex justify-center items-center absolute inset-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-[70px]">
						<img src={medalBox[medalNumber - 1]} alt="goldBox" />
						<div className="flex justify-center items-center absolute inset-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
							<div className="text-white font-MorabbaMedium text-lg">
								{medalAmount}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

ProfileMedal.propTypes = {
	medalNumber: PropTypes.number,
	medalAmount: PropTypes.number,
};

export default ProfileMedal;
