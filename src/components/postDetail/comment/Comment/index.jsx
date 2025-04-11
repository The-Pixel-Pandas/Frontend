import React, { useState } from "react";
import PropTypes from "prop-types";
import UserComment from "../UserComment";
import submitComment from "../../../../assets/images/submitComment.png";
import { useProfileStore } from "../../../../services";
// import { httpService } from "../../../../services";

const Comment = ({ users }) => {
	const [comment, setComment] = useState("");

	// const getUserInfoAPI = async () => {
	// 	try {
	// 		const response = await httpService.get(
	// 			`https://mocki.io/v1/3fc991f0-b555-44c8-b9d5-7c51456f1254`
	// 		);
	// 		return response.data.user;
	// 	} catch (err) {
	// 		console.error("Failed to fetch user info:", err);
	// 	}
	// };

	const setCommentAPI = async () => {
		// try {
		// 	const response = await httpService.post(
		// 		`https://mocki.io/v1/3fc991f0-b555-44c8-b9d5-7c51456f1254`,
		// 		{
		// 			comment: comment,
		// 		}
		// 	);
		// 	return response.data;
		// } catch (err) {
		// 	console.error("Failed to set comment:", err);
		// }
	};

	const addComment = async () => {
		// const response = await getUserInfoAPI();
		const { avatarNumber, name, biography, transaction, volume, rank, medals } =
			useProfileStore.getState();

		users.push({
			id: users.length + 1,
			comment: comment,
			likesNumber: 0,
			avatarNumber: avatarNumber,
			name: name,
			biography: biography,
			transaction: transaction,
			volume: volume,
			rank: rank,
			medals: medals,
		});
		setComment("");
		setCommentAPI();
	};

	return (
		<>
			<div
				className="flex flex-col justify-center items-start w-full mt-5 "
				dir="rtl"
			>
				<div className="flex flex-col gap-6 w-full">
					{/* Title */}
					<div className="text-white font-MorabbaMedium text-lg relative mr-5">
						<span className="relative after:content-[''] after:absolute after:right-0 after:w-full after:h-[2px] after:bg-white after:bottom-[-9px]">
							نظرات کاربران
						</span>
					</div>
					{/* Input */}
					<div
						className="relative ml-10 w-full"
						style={{ width: 927, height: 47 }}
					>
						<input
							type="text"
							placeholder="نظرات خود را ثبت کنید  ..."
							value={comment}
							onChange={(e) => setComment(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									addComment();
								}
							}}
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
							className="absolute left-0 top-0 w-[54px] h-full z-10 focus:outline-none text-[#CFAEEF] font-MorabbaMedium text-xl ml-3 hover:scale-125 transition-transform"
							dir="rtl"
							onClick={addComment}
						>
							ثبت
						</button>
					</div>
					{/* Comments */}
					<div className=" overflow-y-scroll max-h-[250px] no-scrollbar">
						<div className="flex flex-col gap-5">
							{users.map((user) => (
								<UserComment
									key={user.id}
									width={500}
									height={75}
									avatarNumber={user.avatarNumber}
									name={user.name}
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
