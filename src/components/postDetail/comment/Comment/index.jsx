import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import UserComment from "../UserComment";
import submitComment from "../../../../assets/images/submitComment.png";
import { useAuthStore, httpService } from "../../../../services";
import { Toast } from "../../../../components";

const Comment = ({ users, id, isExchange }) => {
	const [comment, setComment] = useState("");
	const [showToast, setShowToast] = useState(false);
	const [ToastMessage, setToastMessage] = useState("");

	const setCommentAPI = () => {
		const data = {
			content: comment,
		};
		httpService
			.post(`${isExchange ? "questions" : "news"}/${id}/comments/`, data)
			.then((res) => {
				setComment("");
				console.log("Comment API", res);
			})
			.catch((err) => {
				console.log("Comment API Error", err);
			});
	};

	const addComment = () => {
		const { isAuthenticated } = useAuthStore.getState();
		if (!isAuthenticated) {
			setShowToast(true);
			setToastMessage("لطفا ابتدا وارد حساب کاربری خود شوید");
			return;
		}
		setCommentAPI();
	};

	useEffect(() => {
		setToastMessage("");
		setTimeout(() => {
			setShowToast(false);
		}, 2000);
		return () => {
			clearTimeout();
		};
	}, [ToastMessage]);

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
									key={user.comment_id}
									width={500}
									height={75}
									avatarNumber={user.avatar || 1}
									name={user.user_name}
									biography={user.bio}
									profit={user.profit}
									volume={user.volume}
									rank={user.rank_total_profit}
									medals={user.medals}
									comment={user.content}
									likesNumber={user.like_count}
									isExchange={isExchange}
									commentId={user.comment_id}
									dataId={id}
									isLike={user.is_liked}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
			{/* Error Toast Handling */}
			{showToast && (
				<div className="absolute inset-0">
					<Toast type="error" message={ToastMessage} position="bottom-left" />
				</div>
			)}
		</>
	);
};

Comment.propTypes = {
	users: PropTypes.array,
	id: PropTypes.number,
	isExchange: PropTypes.bool,
};

export default Comment;
