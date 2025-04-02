import React from "react";
import PropTypes from "prop-types";
import DataContainer from "../DataContainer";
import { Comment } from "../comment";
import { DraggableButton } from "../../chore";

const PostDetail = ({ newsData, usersData }) => {
	return (
		<>
			<DraggableButton />

			<div className="flex flex-col gap-0">
				{newsData.map((item) => (
					<div key={item.id} className="mt-5">
						<DataContainer
							width={1200}
							height={260}
							title={item.title}
							description={item.description}
							image={item.image}
							categories={item.categories}
							numberOfVisits={item.numberOfVisits}
							coins={item.coins}
							date={item.date}
						/>
					</div>
				))}
				<div className="mr-40">
					<Comment users={usersData} />
				</div>
			</div>
		</>
	);
};

PostDetail.propTypes = {
	newsData: PropTypes.array,
	usersData: PropTypes.array,
};

export default PostDetail;
