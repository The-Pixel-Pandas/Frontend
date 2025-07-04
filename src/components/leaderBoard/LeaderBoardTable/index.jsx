import React from "react";
import PropTypes from "prop-types";
import LeaderBoardProfileCard from "../LeaderBoardProfileCard";
import leaderBoardBox from "../../../assets/images/leaderBoardBox.png";

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
							avatarNumber={user.avatar}
							name={user.user_name}
							coinAmount={user.total_balance?.toLocaleString("fa") || "0"}
							biography={user.biography || ""}
							profit={user.profit || user.value}
							volume={user.volume || user.value}
							rank={user.rank}
							medals={user.medals || []}
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
