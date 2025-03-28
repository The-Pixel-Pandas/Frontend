import React, { useState } from "react";
import PropTypes from "prop-types";
import { useAvatarStore } from "../../services";
import leaderBoardUserBox from "../../assets/images/leaderBoardUserBox.png";
import coinLogo from "../../assets/images/coinLogo.png";
import PublicProfilePopup from "../PublicProfilePopup";
import { eventHandler } from "../../services";

const LeaderBoardProfileCard = ({
	width = 500,
	height = 75,
	avatarNumber,
	name,
	coinAmount,
	biography = "",
	transaction = 0,
	volume = 0,
	rank = 0,
	medals = [1, 2, 3],
}) => {
	const { getAvatarByNumber } = useAvatarStore();
	const [showProfile, setShowProfile] = useState(false);

	const openPopUp = () => {
		setShowProfile(true);
		eventHandler.dispatchEvent("OpenPopupSound");
	};
	const closePopUp = () => {
		setShowProfile(false);
		eventHandler.dispatchEvent("ClosePopupSound");
	};

	return (
		<>
			<div className="relative">
				<img
					src={leaderBoardUserBox}
					alt="leaderBoardUserBox"
					style={{ width: width, height: height }}
				/>
				<div className="absolute top-0 right-0 mr-6 mt-2">
					<button onClick={() => openPopUp()}>
						<img
							src={getAvatarByNumber(avatarNumber)}
							alt="avatar"
							style={{ width: 50, height: 50 }}
						/>
					</button>
				</div>
				<div className="absolute top-0 right-0 mr-20 mt-5">
					<div className="text-white font-MorabbaMedium text-lg">{name}</div>
				</div>
				<div className="absolute top-0 left-0 mt-4">
					<div className="flex items-center gap-1.5">
						<img
							src={coinLogo}
							alt="coinLogo"
							style={{ width: 45, height: 40 }}
						/>
						<div className="text-white font-MorabbaMedium text-lg mt-1">
							{coinAmount}
						</div>
					</div>
				</div>
			</div>

			{showProfile && (
				<div className="fixed inset-0 flex items-center justify-center z-50">
					<div className="absolute inset-0 bg-gray-600 opacity-35" />
					<div className="relative z-10">
						<PublicProfilePopup
							avatarNumber={avatarNumber}
							name={name}
							biography={biography}
							transaction={transaction}
							volume={volume}
							rank={rank}
							medals={medals}
							onClick={() => closePopUp()}
						/>
					</div>
				</div>
			)}
		</>
	);
};

LeaderBoardProfileCard.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number,
	avatarNumber: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
	coinAmount: PropTypes.number.isRequired,
	biography: PropTypes.string,
	transaction: PropTypes.number,
	volume: PropTypes.number,
	rank: PropTypes.number,
	medals: PropTypes.arrayOf(PropTypes.number),
};

export default LeaderBoardProfileCard;
