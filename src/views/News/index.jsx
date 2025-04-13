import React, { useEffect } from "react";
import { Pagination } from "@mui/material";
import { useParams } from "react-router-dom";
import {
	Footer,
	CategoryFilter,
	PostDetail,
	Toast,
	HomeSkeleton,
	SearchBar,
	CardGrid,
} from "../../components";
import { useContentView } from "../../hooks";

const NEWS_API = {
	BASE: "https://mocki.io/v1/0e5f8cf0-7026-46a4-8f48-18e42b96e405",
	DETAILS: "https://mocki.io/v1/cdeeecd7-f616-4a06-9da2-a9cc3f5e539d",
	COMMENTS: "https://mocki.io/v1/6ed43c72-ef71-4b5e-8c43-41514698ff21",
};

const News = () => {
	const { newsId } = useParams();
	const {
		data,
		isLoading,
		error,
		initialLoad,
		contentData,
		usersData,
		pageNumber,
		totalPages,
		handleSearch,
		handleCategoryClick,
		handleChangePage,
		fetchDetails,
	} = useContentView(NEWS_API.BASE, NEWS_API.DETAILS, NEWS_API.COMMENTS);

	useEffect(() => {
		if (newsId) {
			fetchDetails(newsId);
		}
	}, [newsId]);

	if (error) {
		return <Toast type="error" message={error} position="bottom-left" />;
	}

	if (newsId && contentData) {
		return (
			<PostDetail
				postData={contentData}
				usersData={usersData}
				isExchange={false}
			/>
		);
	}

	return (
		<>
			{/* SearchBar */}
			<div className="absolute top-0 left-0 ml-80 mt-8">
				<SearchBar width="535px" searchAction={handleSearch} />
			</div>
			{/* CategoryFilter */}
			<CategoryFilter onSelect={handleCategoryClick} />
			{/* Questions Layout */}
			<div className="flex mt-0 justify-center mb-10 pb-24">
				{isLoading && initialLoad ? (
					<HomeSkeleton />
				) : (
					<CardGrid items={data.current_node.data} />
				)}
			</div>
			{/* Pagination */}
			<div>
				<div className="flex justify-center mb-10">
					<Pagination
						boundaryCount={1}
						page={pageNumber}
						onChange={handleChangePage}
						shape="rounded"
						siblingCount={1}
						count={totalPages}
						color="primary"
						size="large"
						variant="text"
						sx={{
							"& .MuiPaginationItem-root": {
								color: "#fff",
								"&.Mui-selected": {
									color: "#fff",
									borderColor: "#fff",
								},
							},
						}}
					/>
				</div>
				{/* Footer */}
				<div>
					<Footer isPageFooter={true} />
				</div>
			</div>
		</>
	);
};

export default News;
