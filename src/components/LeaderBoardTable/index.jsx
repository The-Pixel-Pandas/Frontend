import React from "react";
import PropTypes from "prop-types";
import leaderBoardBox from "../../assets/images/leaderBoardBox.png";
import LeaderBoardProfileCard from "../LeaderBoardProfileCard";

const LeaderBoardTable = ({ title, titleImg, usersData }) => {
	return (
		<div className="relative">
			<img
				src={leaderBoardBox}
				alt="leaderBoardBox"
				style={{ width: 550, height: 470 }}
			/>
			<div className="absolute top-0 right-0 flex items-center gap-4 mt-10 mr-10">
				<div className="text-white font-Lalezar text-2xl">{title}</div>
				<img src={titleImg} alt="titleImg" />
			</div>
			<div className="absolute top-0 right-0 mt-28 mr-6 overflow-y-scroll max-h-[350px] no-scrollbar">
				<div className="flex flex-col gap-1.5">
					{usersData.map((user, index) => (
						<LeaderBoardProfileCard
							key={index}
							avatarNumber={user.avatarNumber}
							name={user.name}
							coinAmount={user.coinAmount}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

LeaderBoardTable.propTypes = {
	title: PropTypes.string.isRequired,
	titleImg: PropTypes.string.isRequired,
	usersData: PropTypes.array.isRequired,
};

export default LeaderBoardTable;
