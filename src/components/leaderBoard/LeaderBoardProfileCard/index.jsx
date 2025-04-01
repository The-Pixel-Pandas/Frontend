import React from "react";
import PropTypes from "prop-types";
import { useAvatarStore } from "../../../services";
import ProfilePopupOverlay from "../../profilePopup/ProfilePopupOverlay";
import { useProfilePopup } from "../../../hooks";
import leaderBoardUserBox from "../../../assets/images/leaderBoardUserBox.png";
import coinLogo from "../../../assets/images/coinLogo.png";

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
	const { showProfile, openPopUp, closePopUp } = useProfilePopup();

	return (
		<>
			<div className="relative">
				<img
					src={leaderBoardUserBox}
					alt="leaderBoardUserBox"
					style={{ width: width, height: height }}
				/>
				<div className="absolute top-0 right-0 mr-6 mt-2">
					<button onClick={openPopUp}>
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

			<ProfilePopupOverlay
				show={showProfile}
				avatarNumber={avatarNumber}
				name={name}
				biography={biography}
				transaction={transaction}
				volume={volume}
				rank={rank}
				medals={medals}
				onClose={closePopUp}
			/>
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
