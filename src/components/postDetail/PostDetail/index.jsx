import React from "react";
import PropTypes from "prop-types";
import DataContainer from "../DataContainer";
import { Comment } from "../comment";
import ExchangeBox from "../exchangeContainer";
import { DraggableButton } from "../../chore";

const PostDetail = ({ postData, usersData, isExchange = true }) => {
	return (
		<>
			<DraggableButton />

			<div className="flex flex-col gap-0">
				<div className="flex flex-row justify-center items-center gap-10">
					{isExchange && (
						<ExchangeBox
							yesPercentage={
								postData.options[0].description == "Yes"
									? postData.options[0].chance
									: postData.options[1].chance
							}
							noPercentage={
								postData.options[1].description == "No"
									? postData.options[1].chance
									: postData.options[0].chance
							}
						/>
					)}

					<div className="mt-5">
						<DataContainer
							width={isExchange ? 1000 : 1200}
							height={isExchange ? 270 : 260}
							title={postData.question_topic || postData.news_topic}
							description={
								postData.question_description || postData.news_description
							}
							image={postData.image}
							categories={
								postData.question_type
									? [postData.question_type, postData.question_tag]
									: [postData.news_type, postData.news_tag]
							}
							numberOfVisits={postData.numberOfVisits || 100}
							coins={postData.coin || 100}
							date={postData.updated_at}
						/>
					</div>
				</div>

				<div className="mr-40">
					<Comment users={usersData} />
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
