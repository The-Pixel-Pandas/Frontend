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
		<div className="w-[300px] h-[136px] flex-shrink-0">
			<div className="flex justify-center items-center">
				<div className="relative flex justify-center items-center">
					<img
						src={medalContainer}
						alt="medalContainer"
						style={{ width: 160, height: 140 }}
					/>
					<div className="flex justify-center items-center absolute inset-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
						<img src={getMedalByNumber(medalNumber)} alt="goldMedal" />
					</div>
					<div className="flex justify-center items-center absolute inset-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-[70px]">
						<img
							src={medalBox[medalNumber - 1]}
							alt="goldBox"
							style={{ width: 100, height: 30 }}
						/>
						<div className="flex justify-center items-center absolute inset-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
							<div className="text-black/60 font-MorabbaBold text-lg">
								{medalAmount.toLocaleString("fa")}
							</div>
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
