import React from "react";
import PropTypes from "prop-types";
import UserComment from "../UserComment";
import submitComment from "../../assets/images/submitComment.png";

const Comment = ({ users }) => {
	return (
		<>
			<div
				className="flex flex-col justify-center items-start w-full mt-5 "
				dir="rtl"
			>
				<div className="flex flex-col gap-6 w-full">
					<div className="text-white font-MorabbaMedium text-lg relative mr-5">
						<span className="relative after:content-[''] after:absolute after:right-0 after:w-full after:h-[2px] after:bg-white after:bottom-[-9px]">
							نظرات کاربران
						</span>
					</div>
					<div
						className="relative ml-10 w-full"
						style={{ width: 927, height: 47 }}
					>
						<input
							type="text"
							placeholder="نظرات خود را ثبت کنید  ..."
							className="placeholder:text-text-200 text-white font-MorabbaMedium text-xl pr-5 pl-20 py-3 bg-transparent relative z-10 focus:outline-none w-full"
							dir="rtl"
						/>
						<img
							src={submitComment}
							alt="submitComment"
							className="absolute top-0 left-0 w-full h-full z-0"
						/>
						<button
							type="submit"
							className="absolute left-0 top-0 w-[54px] h-full z-10 focus:outline-none text-[#CFAEEF] font-MorabbaMedium text-xl ml-3"
							dir="rtl"
						>
							ثبت
						</button>
					</div>
					<div className=" overflow-y-scroll max-h-[250px] no-scrollbar">
						<div className="flex flex-col gap-5">
							{users.map((user) => (
								<UserComment
									key={user.id}
									width={500}
									height={75}
									avatarNumber={user.avatarNumber}
									name={user.name}
									coinAmount={user.coinAmount}
									biography={user.biography}
									transaction={user.transaction}
									volume={user.volume}
									rank={user.rank}
									medals={user.medals}
									comment={user.comment}
									likesNumber={user.likesNumber}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

Comment.propTypes = {
	users: PropTypes.array,
};

export default Comment;
