import React, { useEffect, useState } from "react";
import { QuestionGrid } from "../../components";
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
			`https://mocki.io/v1/c0b30442-ef1f-4a6c-9743-28663d7353d9?_page=${pageNumber}&_category=${activeCategory}&_search=${searchText}`
		);
		// handleQuestionAPI(
		// 	"https://mocki.io/v1/39306c41-5841-4cea-b447-e5c86fdd3680"
		// );
	};

	const handleCategoryClick = (category) => {
		setActiveCategory(category);
		handleQuestionAPI(
			`https://mocki.io/v1/c0b30442-ef1f-4a6c-9743-28663d7353d9?_page=${pageNumber}&_category=${category}`
		);
		// handleQuestionAPI(
		// 	"https://mocki.io/v1/76d7cf1f-432d-4c9c-923c-b79c6e4b15b6"
		// );
	};

	const handleChangePage = (event, page) => {
		setPageNumber(page);
		handleQuestionAPI(
			`https://mocki.io/v1/c0b30442-ef1f-4a6c-9743-28663d7353d9?_page=${page}&_category=${activeCategory}`
		);
		// handleQuestionAPI(
		// 	"https://mocki.io/v1/4f77a0f2-3604-4b37-9505-9f8a943951ef"
		// );
		event.preventDefault();
	};

	const handleQuestionAPI = async (url) => {
		try {
			const response = await fetchData(url);
			console.log("Fetched data:", response);
			setInitialLoad(false);
			setTotalPages(response.total_pages);
		} catch (error) {
			console.error("Error fetching initial data:", error);
			setInitialLoad(false);
		}
	};

	useEffect(() => {
		handleQuestionAPI(
			"https://mocki.io/v1/c0b30442-ef1f-4a6c-9743-28663d7353d9"
		);
	}, []);

	useEffect(() => {
		if (questionId) {
			const fetchQuestionDetails = async () => {
				try {
					const [questionResponse, commentsResponse] = await Promise.all([
						httpService.get(
							`https://mocki.io/v1/cdeeecd7-f616-4a06-9da2-a9cc3f5e539d`
						),
						httpService.get(
							`https://mocki.io/v1/6ed43c72-ef71-4b5e-8c43-41514698ff21`
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
						<QuestionGrid questions={data.current_node.data} />
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
		</>
	);
};

export default Home;
