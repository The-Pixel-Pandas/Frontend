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
							yesPercentage={postData.yesPercentage}
							noPercentage={postData.noPercentage}
						/>
					)}

					<div className="mt-5">
						<DataContainer
							width={isExchange ? 1000 : 1200}
							height={isExchange ? 270 : 260}
							title={postData.title}
							description={postData.description}
							image={postData.image}
							categories={postData.categories}
							numberOfVisits={postData.numberOfVisits}
							coins={postData.coins}
							date={postData.date}
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
