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
	BASE: "https://mocki.io/v1/779b7b4b-8ee0-4e3b-adcf-87f06ebc0d8c",
	DETAILS: "https://mocki.io/v1/7e5852b3-6ec0-4c7a-b1fd-995d81590d0d",
	COMMENTS: "https://mocki.io/v1/ed2f226e-b1b6-4e47-9dfe-6accfbfd466b",
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
