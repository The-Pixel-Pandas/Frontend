import React from "react";
import PropTypes from "prop-types";
import leaderBoardBox from "../../assets/images/leaderBoardBox.png";
// use phaser library here if needed
// import Phaser from "phaser";

const LeaderBoardTable = ({ title, titleImg, usersData }) => {
	return (
		<div className="relative">
			<img src={leaderBoardBox} alt="leaderBoardBox" />
			<div className="absolute top-0 right-0 flex items-center gap-4 mt-10 mr-10">
				<div className="text-white font-Lalezar text-3xl">{title}</div>
				<img src={titleImg} alt="titleImg" />
			</div>
			<div className="absolute inset-0">{usersData}</div>
		</div>
	);
};

LeaderBoardTable.propTypes = {
	title: PropTypes.string.isRequired,
	titleImg: PropTypes.string.isRequired,
	usersData: PropTypes.array.isRequired,
};

export default LeaderBoardTable;
