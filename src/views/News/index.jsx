import React from "react";
import { useParams, Link } from "react-router-dom";
import { CategoryFilter } from "../../components";

const News = () => {
	const { newsId } = useParams();
	return (
		<>
			<CategoryFilter />
		</>
	);
};

export default News;
