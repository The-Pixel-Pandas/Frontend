import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { httpService } from "../../../services";
import DataContainer from "../DataContainer";
import { Comment } from "../comment";
import ExchangeBox from "../exchangeContainer";
import { DraggableButton } from "../../chore";

const PostDetail = ({ postData, usersData, isExchange = true }) => {
	const [questionVolume, setQuestionVolume] = useState(
		Math.ceil(postData.question_volume)
	);
	const [postDataOptions, setPostDataOptions] = useState(postData.options);

	const updateAction = (data) => {
		// update volume and chance in page
		setQuestionVolume(data.option_volume);
		httpService.get(`questions/${postData.question_id}`).then((res) => {
			setPostDataOptions(res.options);
		});
	};

	useEffect(() => {
		if (isExchange) {
			setQuestionVolume(Math.ceil(postData.question_volume));
			setPostDataOptions(postData.options);
		}
	}, [postData]);

	return (
		<>
			<DraggableButton />

			<div className="flex flex-col gap-0">
				<div className="flex flex-row justify-center items-center gap-10">
					{isExchange && (
						<ExchangeBox
							yesPercentage={
								postDataOptions[0].description == "Yes"
									? postDataOptions[0]
									: postDataOptions[1]
							}
							noPercentage={
								postDataOptions[1].description == "No"
									? postDataOptions[1]
									: postDataOptions[0]
							}
							updateAction={updateAction}
						/>
					)}

					<div className="mt-5">
						<DataContainer
							isExchange={isExchange}
							width={isExchange ? 1000 : 1200}
							height={isExchange ? 270 : 260}
							title={postData.question_topic || postData.news_topic}
							description={
								postData.question_description || postData.news_description
							}
							image={postData.image_base64}
							categories={
								postData.question_type
									? [postData.question_type, postData.question_tag]
									: [postData.news_type, postData.news_tag]
							}
							coins={questionVolume}
							date={
								isExchange
									? new Intl.DateTimeFormat("fa-IR", {
											year: "numeric",
											month: "2-digit",
											day: "2-digit",
										}).format(new Date(postData.updated_at))
									: ""
							}
						/>
					</div>
				</div>

				<div className="mr-40">
					<Comment
						users={usersData}
						id={postData.question_id || postData.news_id}
						isExchange={isExchange}
					/>
				</div>
			</div>
		</>
	);
};

PostDetail.propTypes = {
	postData: PropTypes.object,
	usersData: PropTypes.array,
	isExchange: PropTypes.bool,
};

export default PostDetail;
