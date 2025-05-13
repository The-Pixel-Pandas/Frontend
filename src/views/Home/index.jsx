import React, { useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import { httpService } from "../../services";
import { useFetchData } from "../../hooks";
import {
	Footer,
	CategoryFilter,
	PostDetail,
	Toast,
	HomeSkeleton,
	SearchBar,
	CardGrid,
} from "../../components";
import { useParams } from "react-router-dom";

const Home = () => {
	const { fetchData, data, isLoading, error } = useFetchData();
	const [initialLoad, setInitialLoad] = useState(true);
	const [questionData, setQuestionData] = useState(null);
	const [usersData, setUsersData] = useState([]);
	const [pageNumber, setPageNumber] = useState(1);
	const { questionId } = useParams();
	const [activeCategory, setActiveCategory] = useState("همه موارد");
	const [totalPages, setTotalPages] = useState(0);

	const handleSearch = (searchText) => {
		console.log("Searched!", searchText);
		handleQuestionAPI(
			`https://mocki.io/v1/50b1e26f-2bd0-4a7a-b834-c63810c1d140?_page=${pageNumber}&_category=${activeCategory}&_search=${searchText}`
		);
	};

	const handleCategoryClick = (category) => {
		setActiveCategory(category);
		handleQuestionAPI(
			`https://mocki.io/v1/50b1e26f-2bd0-4a7a-b834-c63810c1d140?_page=${pageNumber}&_category=${category}`
		);
	};

	const handleChangePage = (event, page) => {
		setPageNumber(page);
		handleQuestionAPI(
			`https://mocki.io/v1/50b1e26f-2bd0-4a7a-b834-c63810c1d140?_page=${page}&_category=${activeCategory}`
		);
		event.preventDefault();
	};

	const handleQuestionAPI = async (url) => {
		try {
			const response = await fetchData(url);
			console.log("Fetched data:", response);
			setInitialLoad(false);
			setTotalPages(response.current_node.total_pages);
		} catch (error) {
			console.error("Error fetching initial data:", error);
			setInitialLoad(false);
		}
	};

	useEffect(() => {
		handleQuestionAPI(
			"https://mocki.io/v1/50b1e26f-2bd0-4a7a-b834-c63810c1d140"
		);
	}, []);

	useEffect(() => {
		if (questionId) {
			const fetchQuestionDetails = async () => {
				try {
					const [questionResponse, commentsResponse] = await Promise.all([
						httpService.get(
							`https://mocki.io/v1/7e5852b3-6ec0-4c7a-b1fd-995d81590d0d`
						),
						httpService.get(
							`https://mocki.io/v1/ed2f226e-b1b6-4e47-9dfe-6accfbfd466b`
						),
					]);
					setQuestionData(questionResponse.data);
					setUsersData(commentsResponse);
				} catch (err) {
					console.error("Failed to fetch question details:", err);
				}
			};

			fetchQuestionDetails();
		}
	}, [questionId]);

	if (error) {
		return <Toast type="error" message={error} position="bottom-left" />;
	}

	if (questionId && questionData) {
		return (
			<PostDetail
				postData={questionData}
				usersData={usersData}
				isExchange={true}
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

export default Home;
