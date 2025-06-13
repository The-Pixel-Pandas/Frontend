import React, { useState } from "react";
import PropTypes from "prop-types";
import {
	useAvatarStore,
	eventHandler,
	httpService,
} from "../../../../services";
import { useProfilePopup } from "../../../../hooks";
import ProfilePopupOverlay from "../../../profilePopup/ProfilePopupOverlay";
import userCommentBox from "../../../../assets/images/userCommentBox.png";
import likeOption from "../../../../assets/images/likeOption.png";
import unlikeOption from "../../../../assets/images/unlikeOption.png";

const UserComment = ({
	avatarNumber,
	name,
	biography = "",
	profit = 0,
	volume = 0,
	rank = 0,
	medals = [],
	comment = "",
	likesNumber = 0,
	isExchange = true,
	commentId,
	dataId,
	isLike,
}) => {
	const { getAvatarByNumber } = useAvatarStore();
	const { showProfile, openPopUp, closePopUp } = useProfilePopup();
	const [isLiked, setIsLiked] = useState(isLike);
	const [likesCount, setLikesCount] = useState(likesNumber);

	const handleLike = () => {
		eventHandler.dispatchEvent("LikeSound");
		if (isLiked) {
			setLikesCount(likesCount - 1);
		} else {
			setLikesCount(likesCount + 1);
		}
		setIsLiked(!isLiked);
		httpService.post(
			`${isExchange ? "questions" : "news"}/${dataId}/comments/${commentId}/like/`
		);
	};

	return (
		<>
			<div className="flex flex-row gap-4">
				{/* Avatar */}
				<button onClick={openPopUp} className="focus:outline-none mb-10 mr-10">
					<img
						src={getAvatarByNumber(avatarNumber)}
						alt="avatar"
						style={{ width: 50, height: 50 }}
					/>
				</button>
				{/* User Comment Box */}
				<div className="relative">
					{/* User Comment Box Image */}
					<img
						src={userCommentBox}
						alt="userCommentBox"
						style={{ width: 759, height: 117 }}
					/>
					{/* User Comment Texts */}
					<div className="absolute top-2 right-4">
						<div className="flex flex-col gap-2 text-white font-MorabbaMedium text-lg">
							<span>{name}</span>
							<span
								className="text-gray-400 mr-2 whitespace-pre-wrap break-words overflow-y-scroll no-scrollbar"
								style={{ maxWidth: 659, maxHeight: 50 }}
							>
								{comment}
							</span>
						</div>
					</div>
					{/* Likes */}
					<div className="absolute bottom-4 left-4 flex flex-row gap-2 items-center">
						<span className="text-white font-MorabbaMedium text-lg">
							{likesCount.toLocaleString("fa")}
						</span>
						<button
							type="button"
							className="focus:outline-none"
							onClick={handleLike}
						>
							<img
								src={isLiked ? likeOption : unlikeOption}
								alt="likeOption"
								style={{
									width: isLiked ? 19.43 : 19,
									height: isLiked ? 16.79 : 19,
								}}
							/>
						</button>
					</div>
				</div>
			</div>
			{/* Profile Popup */}
			<ProfilePopupOverlay
				show={showProfile}
				avatarNumber={avatarNumber}
				name={name}
				biography={biography}
				profit={profit}
				volume={volume}
				rank={rank}
				medals={medals}
				onClose={closePopUp}
			/>
		</>
	);
};

UserComment.propTypes = {
	avatarNumber: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
	biography: PropTypes.string,
	profit: PropTypes.number,
	volume: PropTypes.number,
	rank: PropTypes.number,
	medals: PropTypes.arrayOf(PropTypes.number),
	comment: PropTypes.string,
	likesNumber: PropTypes.number,
	isExchange: PropTypes.bool,
	commentId: PropTypes.number,
	dataId: PropTypes.number,
	isLike: PropTypes.bool,
};

export default UserComment;
